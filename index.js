const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = '5f470a4fb8595ee0ff7a510dbb513afa';

weatherForm.addEventListener('submit', async event => {
    event.preventDefault();
    const city = cityInput.value;
    
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } 
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError('Please enter a city name');
    }
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('City not found');
    }
    
    return await response.json();
}

function displayWeatherInfo(data) {
    const { name, city,
            main: { temp, humidity }, 
            weather: [{ description, id }] } = data;

    card.textContent = '';
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = name;
    tempDisplay.textContent = ` ${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add('weatherEmoji');

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return '⛈️';
    }
    else if (weatherId >= 300 && weatherId < 400) {
        return '🌧️';
    }
    else if (weatherId >= 500 && weatherId < 600) {
        return '🌧️';
    }
    else if (weatherId >= 600 && weatherId < 700) {
        return '❄️';
    }
    else if (weatherId >= 700 && weatherId < 800) {
        return '🌫️';
    }
    else if (weatherId === 800) {
        return '☀️';
    }
    else if (weatherId >= 801 && weatherId < 900) {
        return '☁️';
    }
    else {
        return '🤷';
    }
}

function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}