import pool from './database.js'; // Database connection pool
import { getOptimizedRoute } from './route.js';
import { broadcastRouteData } from './websocket.js';
import { simulateBotMovement } from './simulation.js';
import dotenv from 'dotenv';
import moment from 'moment';
dotenv.config();

const TIME_LIMIT_MINUTES = 3;
const WEIGHT_LIMIT_LBS = 3200;
const WAREHOUSE_LATITUDE = parseFloat(process.env.WAREHOUSE_LATITUDE);
const WAREHOUSE_LONGITUDE = parseFloat(process.env.WAREHOUSE_LONGITUDE);

/**
 * Dispatch sales based on time or weight constraints.
 * Optionally, you can pass specific sale IDs to dispatch.
 */
// Update Customer Info
export async function dispatchSales(saleIds = null) {
    const connection = await pool.getConnection();
    try {
        // Attempt to acquire an advisory lock to prevent concurrent dispatches
        const [lockResult] = await connection.query(`SELECT GET_LOCK('dispatch_lock', 10) AS lock_status`);
        if (lockResult[0].lock_status !== 1) {
            console.warn('Could not acquire dispatch lock. Skipping dispatch.');
            return;
        }

        await connection.beginTransaction();

        // Check if there's an ongoing route
        const [ongoingRoutes] = await connection.query(
            `SELECT ID FROM ROUTES WHERE STATUS = 'IN_PROGRESS'`
        );

        if (ongoingRoutes.length > 0) {
            // console.log('A route is already in progress. Skipping dispatch.');
            await connection.commit();
            return;
        }

        let salesQuery = `
            SELECT ID, SALEDATE 
            FROM SALES 
            WHERE SALE_STATUS = 'STARTED'
        `;
        let salesParams = [];
        
        if (saleIds && saleIds.length > 0) {
            salesQuery += ` AND ID IN (?)`;
            salesParams.push(saleIds);
        }
        
        salesQuery += ` ORDER BY SALEDATE ASC;`; // No LIMIT here
        
        // Get all 'STARTED' sales
        const [allStartedSales] = await connection.query(salesQuery, salesParams);
        // console.log(`allStartedSales: ${allStartedSales}`);
        
        if (allStartedSales.length === 0) {
            await connection.commit();
            return;
        }

        const earliestSale = allStartedSales[0];
        const earliestSaleDate = moment(earliestSale.SALEDATE, 'YYYY-MM-DD HH:mm:ss');
        const now = moment();
        const minutesSinceEarliestSale = now.diff(earliestSaleDate, 'minutes');
        // console.log(`minutesSinceEarliestSale: ${minutesSinceEarliestSale}`);
        
        // Check if earliest sale hit the 3-minute mark
        if (minutesSinceEarliestSale < TIME_LIMIT_MINUTES) {
          await connection.commit();
          return;
        }
        
        // Now we need to pick sales up to 10 or until total weight is 3200 ounces
        const selectedSales = [];
        let currentWeight = 0;

        // console.log(`allStartedSales[0]: ${allStartedSales[0]}`);
        // console.log(`allStartedSales[1]: ${allStartedSales[1]}`);
        
        for (const sale of allStartedSales) {
            // console.log(`sale.ID: ${sale.ID}`);
            // Get the weight of this individual sale
            const [thisSaleWeightResult] = await connection.query(
                `SELECT SUM(SP.QUANTITY * P.WEIGHT) AS sale_weight
                FROM SALES_PRODUCTS SP
                JOIN PRODUCTS P ON SP.PRODUCTID = P.ID
                WHERE SP.SALESID = ?`,
                [sale.ID]
            );
            const thisSaleWeight = Number(thisSaleWeightResult[0].sale_weight) || 0;
            // console.log(`thisSaleWeight: ${thisSaleWeight}`);
            // console.log(`currentWeight + thisSaleWeight: ${currentWeight + thisSaleWeight}`);
            
            // Check if adding this sale would exceed our constraints
            if (selectedSales.length < 10 && (currentWeight + thisSaleWeight) <= WEIGHT_LIMIT_LBS) {
                selectedSales.push(sale);
                // console.log(`thisSaleWeight: ${thisSaleWeight}`);
                currentWeight += thisSaleWeight;
                // console.log(`selectedSales: ${selectedSales}`);
                // console.log(`currentWeight: ${currentWeight}`);
            } else {
                // Don't break, just skip this sale and continue checking others
                // Do nothing here, just let the loop continue
                continue;
            }            
        }
        
        // If no sales selected after filtering, just return
        if (selectedSales.length === 0) {
            await connection.commit();
            return;
        }
        
        const saleIdsToDispatch = selectedSales.map(sale => sale.ID);
        // console.log(`saleIdsToDispatch: ${saleIdsToDispatch}`);

        // Update sales to 'ONGOING'
        await connection.query(
            `UPDATE SALES SET SALE_STATUS = 'ONGOING' WHERE ID IN (?)`,
            [saleIdsToDispatch]
        );
    
        // Fetch customer coordinates for these specific sales
        const [coordsResult] = await connection.query(
            `SELECT S.ID AS SALE_ID, C.LATITUDE, C.LONGITUDE
                FROM SALES S
                JOIN CUSTOMERS C ON S.CUSTOMERID = C.ID
                WHERE S.ID IN (?)`,
            [saleIdsToDispatch]
        );

        // Map sale IDs to coordinates
        const deliveryCoords = coordsResult.map(coord => ({
            saleId: coord.SALE_ID,
            latitude: coord.LATITUDE,
            longitude: coord.LONGITUDE
        }));

        // console.log('Fetched Delivery Coordinates:', deliveryCoords);

        // Validate coordinates
        const coordsForRoute = deliveryCoords.map(coord => ({
            latitude: coord.latitude,
            longitude: coord.longitude
        }));

        // console.log('Route Start Coordinate:', { latitude: WAREHOUSE_LATITUDE, longitude: WAREHOUSE_LONGITUDE });
        // console.log('Coordinates for Route:', coordsForRoute);

        // Validate coordinates
        coordsForRoute.forEach((coord, index) => {
            if (
                typeof coord.latitude !== 'number' ||
                typeof coord.longitude !== 'number' ||
                isNaN(coord.latitude) ||
                isNaN(coord.longitude) ||
                coord.latitude < -90 || coord.latitude > 90 ||
                coord.longitude < -180 || coord.longitude > 180
            ) {
                throw new Error(`Invalid coordinates at index ${index}: Latitude=${coord.latitude}, Longitude=${coord.longitude}`);
            }
        });

        // Warehouse coordinates
        const startCoord = { latitude: WAREHOUSE_LATITUDE, longitude: WAREHOUSE_LONGITUDE };

        // Get the optimized route
        const routeData = await getOptimizedRoute(startCoord, coordsForRoute);
        // console.log('Optimized Route Data:', JSON.stringify(routeData, null, 2));

        // Store the modified routeData
        const routeJson = JSON.stringify(routeData);

        const [routeInsertResult] = await connection.query(
            `INSERT INTO ROUTES (ROUTE_DATA, START_TIME, STATUS) VALUES (?, NOW(), 'IN_PROGRESS')`,
            [routeJson]
        );

        const routeId = routeInsertResult.insertId;

        // Update SALES table to set ROUTE_ID
        await connection.query(
            `UPDATE SALES SET ROUTE_ID = ? WHERE ID IN (?)`,
            [routeId, saleIdsToDispatch]
        );

        await connection.commit();

        // Broadcast the new route data via WebSocket
        broadcastRouteData(routeData);
        // console.log("Broadcast done.");

        simulateBotMovement(routeData, routeId, deliveryCoords);
        // console.log("Simulation started.");

    } catch (err) {
        await connection.rollback();
        console.error('Error in dispatchSales:', err);
        throw err; // Re-throw the error after rollback
    } finally {
        // Release the advisory lock
        await connection.query(`SELECT RELEASE_LOCK('dispatch_lock')`);
        connection.release();
    }
}