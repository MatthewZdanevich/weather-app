const dotenv = require('dotenv');

// Конфигурация
dotenv.config();
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error('Error: API key is not set in environment variables.');
    process.exit(1);
}

module.exports = { API_KEY };