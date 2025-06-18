// Search elements
const searchInput = document.querySelector('input');
const searchForm = document.querySelector('form');

// Location paragraphs
const locationParagraph = document.querySelector('.location');

// Date paragraphs
const dateParagraph = document.querySelector('.date');

// Temperature paragraphs
const temperatureParagraph = document.querySelector('.temperature');

// Sunrise paragraphs
const sunriseParameterParagraph = document.querySelector('.parameter.sunrise');
const sunriseValueParagraph = document.querySelector('.value.sunrise');

// Sunset paragraphs
const sunsetParameterParagraph = document.querySelector('.parameter.sunset');
const sunsetValueParagraph = document.querySelector('.value.sunset');

// Humidity paragraphs
const humidityParameterParagraph = document.querySelector('.parameter.humidity');
const humidityValueParagraph = document.querySelector('.value.humidity');

// Pressure paragraphs
const pressureParameterParagraph = document.querySelector('.parameter.pressure');
const pressureValueParagraph = document.querySelector('.value.pressure');

// Visibility paragraphs
const visibilityParameterParagraph = document.querySelector('.parameter.visibility');
const visibilityValueParagraph = document.querySelector('.value.visibility');

// Wind paragraphs
const windParameterParagraph = document.querySelector('.parameter.wind');
const windValueParagraph = document.querySelector('.value.wind');

// Search button event
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchInput.value;
    searchInput.value = '';

    locationParagraph.textContent = '...';
    dateParagraph.textContent = '';
    temperatureParagraph.textContent = '';
    sunriseParameterParagraph.textContent = '';
    sunriseValueParagraph.textContent = '';
    sunsetParameterParagraph.textContent = '';
    sunsetValueParagraph.textContent = '';
    humidityParameterParagraph.textContent = '';
    humidityValueParagraph.textContent = '';
    pressureParameterParagraph.textContent = '';
    pressureValueParagraph.textContent = '';
    visibilityParameterParagraph.textContent = '';
    visibilityValueParagraph.textContent = '';
    windParameterParagraph.textContent = '';
    windValueParagraph.textContent = '';

    fetch(`/weather?address=${location}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.title) {
                    locationParagraph.textContent = data.title;
                    dateParagraph.textContent = data.message;
                    return;
                }

                locationParagraph.textContent = `${data.city}, ${data.country}`;
                dateParagraph.textContent = `${data.weather}, ${data.date}`;
                temperatureParagraph.textContent = `${data.temperature}°`;
                sunriseParameterParagraph.textContent = 'Sunrise';
                sunriseValueParagraph.textContent = data.sunrise;
                sunsetParameterParagraph.textContent = 'Sunset';
                sunsetValueParagraph.textContent = data.sunset;
                humidityParameterParagraph.textContent = 'Humidity';
                humidityValueParagraph.textContent = `${data.humidity}%`;
                pressureParameterParagraph.textContent = 'Pressure';
                pressureValueParagraph.textContent = `${data.pressure} hPA`;
                visibilityParameterParagraph.textContent = 'Visibility';
                visibilityValueParagraph.textContent = `${data.visibility} km`;
                windParameterParagraph.textContent = 'Wind';
                windValueParagraph.textContent = `${data.wind[0]} m/s, ${data.wind[1]}`;
            })
        });
});