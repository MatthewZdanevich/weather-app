const axios = require('axios');
const { getCoordinates } = require('./coordinates.js');
const { API_KEY } = require('./configuration.js');

// Получение текущей даты
const epochToFormattedDate = (epoch) => {
    const date = new Date(epoch * 1000);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${dayOfWeek}, ${day} ${month}`;
}

// Перевод времени из EPOCH-формата в человеческий
const epochTo24HourTime = (epoch) => {
    const date = new Date(epoch * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Получение разницы во времени между часовыми поясами
const getSecondsOffsetFromGMT = () => {
    const now = new Date();
    const utcOffsetMinutes = now.getTimezoneOffset();
    const secondsOffset = utcOffsetMinutes * 60;
    return secondsOffset;
}

// Получение строкового представления направления ветра
const getWindDirection = (degrees) => {
    degrees = ((degrees % 360) + 360) % 360;
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

// Получение данных о текущей погоде
async function getWeather(city) {
    try {
        if (!city) {
            throw new Error('The name of the city was not specified.');
        }

        const coordinates = await getCoordinates(city);
        const { latitude, longitude } = coordinates;

        const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;       
        const response = await axios.get(weather_url);

        return {
            city: coordinates.city,
            country: coordinates.country,
            weather: response.data.weather[0].main,
            temperature: response.data.main.temp.toFixed(1),
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            visibility: response.data.visibility / 1000,
            wind: [ response.data.wind.speed, getWindDirection(response.data.wind.deg) ],
            date: epochToFormattedDate(response.data.sys.sunrise + response.data.timezone + getSecondsOffsetFromGMT()),
            sunrise: epochTo24HourTime(response.data.sys.sunrise + response.data.timezone + getSecondsOffsetFromGMT()),
            sunset: epochTo24HourTime(response.data.sys.sunset + response.data.timezone + getSecondsOffsetFromGMT())
        }
    } catch (error) {
        if (error.response) {
            return {
                title: 'API error',
                author: 'Matthew Zdanevich',
                date: 'June 2025',
                message: error.response.statusText + '.' || 'Unknown error.'
            }
        } else if (error.request) {
            return {
                title: 'Network error',
                author: 'Matthew Zdanevich',
                date: 'June 2025',
                message: 'Failed to connect to the server.'
            }
        } else {
            return {
                title: 'Error',
                author: 'Matthew Zdanevich',
                date: 'June 2025',
                message: error.message + '.' || 'Unknown error.'
            }
        }
    }
}

module.exports = { getWeather };