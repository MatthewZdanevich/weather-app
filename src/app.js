const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { getWeather } = require('./utils/weather.js'); 

// Конфигурация сервера
const app = express();
const port = 3000;

// Конфигурация путей
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialDirectoryPath = path.join(__dirname, '../templates/partials');

// Конфигурация Handlebars
app.set('views', viewsDirectoryPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialDirectoryPath)

// Маршрутизация
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('weather', {
        title: 'Weather',
        author: 'Matthew Zdanevich',
        date: 'June 2025'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.render('error' , {
            title: 'Bad request',
            author: 'Matthew Zdanevich',
            date: 'June 2025',
            message: 'The server cannot process the request due to incorrect syntax or missing mandatory parameters.'
        });
    }

    getWeather(req.query.address)
        .then((result) => {
            res.json(result);
        })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Matthew Zdanevich',
        date: 'June 2025'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Matthew Zdanevich',
        date: 'June 2025'
    });
});

app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Page not found',
        author: 'Matthew Zdanevich',
        date: 'June 2025',
        message: 'The server cannot find the requested resource.'
    });
});

// Запуск сервера по порту 3000
app.listen(port, (error) => {
    if (error) {
        console.error(`Failed to start server on port ${port}: ${err.message}`);
        process.exit(1);
    }
    console.log('The server is running on port 3000');
});