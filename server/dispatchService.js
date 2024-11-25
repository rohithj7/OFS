import pool from './database.js'; // Database connection pool
import { getOptimizedRoute } from './route.js';
import { broadcastRouteData } from './websocket.js';
import { simulateBotMovement } from './simulation.js';
import dotenv from 'dotenv';
dotenv.config();

const TIME_LIMIT_MINUTES = 2;
const WEIGHT_LIMIT_LBS = 200;
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
            console.log('A route is already in progress. Skipping dispatch.');
            await connection.commit();
            return;
        }

        // **Corrected Query Construction**
        let salesQuery = `SELECT ID, SALEDATE FROM SALES WHERE SALE_STATUS = 'ONGOING'`;
        let salesParams = [];

        if (saleIds && saleIds.length > 0) {
            salesQuery += ` AND ID IN (?)`; // Move AND before ORDER BY
            salesParams.push(saleIds);
        }

        salesQuery += ` ORDER BY SALEDATE ASC`; // Add ORDER BY at the end

        // Get 'STARTED' sales, optionally filtered by saleIds
        const [sales] = await connection.query(salesQuery, salesParams);

        if (sales.length === 0) {
            console.log('No sales to dispatch.');
            await connection.commit();
            return;
        }

        // Get the earliest SALEDATE
        const earliestSale = sales[0];
        const earliestSaleDate = new Date(earliestSale.SALEDATE);
        const now = new Date();
        const minutesSinceEarliestSale = (now - earliestSaleDate) / (1000 * 60);

        // Get the total weight of 'STARTED' sales
        const [weightResult] = await connection.query(
            `SELECT SUM(SP.QUANTITY * P.WEIGHT) AS total_weight
                FROM SALES_PRODUCTS SP
                JOIN SALES S ON SP.SALESID = S.ID
                JOIN PRODUCTS P ON SP.PRODUCTID = P.ID
                WHERE S.SALE_STATUS = 'ONGOING'`
        );

        const totalWeight = weightResult[0].total_weight || 0;

        // Determine if dispatching criteria are met
        const shouldDispatch = minutesSinceEarliestSale >= TIME_LIMIT_MINUTES || totalWeight >= WEIGHT_LIMIT_LBS;

        if (true) {
            const saleIdsToDispatch = sales.map(sale => sale.ID);

            // Update sales to 'ONGOING'
            await connection.query(
                `UPDATE SALES SET SALE_STATUS = 'ONGOING' WHERE ID IN (?)`,
                [saleIdsToDispatch]
            );

            // Get customer coordinates
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

            console.log('Fetched Delivery Coordinates:', deliveryCoords);

            // Validate coordinates
            const coordsForRoute = deliveryCoords.map(coord => ({
                latitude: coord.latitude,
                longitude: coord.longitude
            }));

            console.log('Route Start Coordinate:', { latitude: WAREHOUSE_LATITUDE, longitude: WAREHOUSE_LONGITUDE });
            console.log('Coordinates for Route:', coordsForRoute);

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
            console.log('Optimized Route Data:', JSON.stringify(routeData, null, 2));

            // Annotate waypoints with sale IDs
            const waypoints = routeData.waypoints;

            // Map original index to saleId
            const originalIndexToSaleId = {};
            for (let i = 0; i < deliveryCoords.length; i++) {
                originalIndexToSaleId[i] = deliveryCoords[i].saleId;
            }

            // Add saleId to waypoints
            for (const waypoint of waypoints) {
                const originalIndex = waypoint.waypoint_index;
                waypoint.saleId = originalIndexToSaleId[originalIndex] || null;
            }

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
            console.log("Broadcast done.");

            simulateBotMovement(routeData);
            console.log("Simulation started.");
        } else {
            console.log('Dispatching criteria not met. Skipping dispatch.');
            await connection.commit();
        }

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