const axios = require('axios');

// OpenWeatherMap API configuration
const apiKey = 'f0fce69882924c9fc32dafd040103316';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Command line arguments
const city = process.argv[2];

// Validate command line arguments
if (!city) {
  console.log('Please provide a city as a command line argument.');
  process.exit(1);
}

// Function to fetch weather data
const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
    });

    const weatherData = response.data;
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error.response.data.message);
    process.exit(1);
  }
};

// Main function to fetch and display weather data
const getWeather = async (city) => {
  try {
    const weatherData = await fetchWeatherData(city);
    console.log('Weather for', city);
    console.log('Temperature:', weatherData.main.temp, '°C');
    console.log('Humidity:', weatherData.main.humidity, '%');
    console.log('Description:', weatherData.weather[0].description);
  } catch (error) {
    console.error('An error occurred:', error.message);
    process.exit(1);
  }
};

// Call the main function
getWeather(city);
