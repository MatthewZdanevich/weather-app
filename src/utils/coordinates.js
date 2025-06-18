const axios = require('axios');

// Получение географических координат
async function getCoordinates(city) {
    try {
        const coordinates_url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1&addressdetails=1`;
        const response = await axios.get(coordinates_url);

        if (response.data[0] === undefined) {
            throw new Error('Location not found');
        }

        return {
            city: response.data[0].name,
            country: response.data[0].address.country,
            latitude: response.data[0].lat,
            longitude: response.data[0].lon
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { getCoordinates };