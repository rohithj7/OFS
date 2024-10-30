import fetch from "node-fetch"

export async function geocodeAddress(address) {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].geometry.coordinates;
        return { latitude, longitude };
    } else {
        throw new Error('Geocoding failed for address: ' + address);
    }
}

export async function getOptimizedRoute(startCoord, deliveryCoords) {
    // Combine coordinates: [startCoord, ...deliveryCoords, endCoord]
    const coordinates = [startCoord, ...deliveryCoords, startCoord]
        .map((coord) => `${coord.longitude},${coord.latitude}`)
        .join(';');

    // Build the API request URL with fixed source and destination
    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates}` +
        `?access_token=${process.env.MAPBOX_ACCESS_TOKEN}` +
        `&geometries=geojson` +
        `&overview=full` +
        `&roundtrip=true` +          // Not returning to starting point unless endCoord is same as startCoord
        `&source=first` +             // Fix the starting point
        `&destination=last`;          // Fix the end point

    const response = await fetch(url);
    const data = await response.json();

    // Check for errors
    if (data.code !== 'Ok') {
        console.error('Mapbox API Error:', data);
        throw new Error('Error from Mapbox API: ' + data.message);
    }

    return data;
}  