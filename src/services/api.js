import axios from "axios";
import { WEATHER_MAP_API_KEY } from '@env';

const WEATHER_API_KEY = WEATHER_MAP_API_KEY;
const WEATHER_MAP_API_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&';
const FORECAST_MAP_API_URL = 'api.openweathermap.org/data/2.5/forecast?units=metric&';


const GEO_CITY_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10';
const GEO_CITY_API_KEY = '99ab890675msh77d03d8948b9b03p1b3ed1jsnc0ccc5a02289';
const GEO_CITY_API_HOST = 'wft-geo-db.p.rapidapi.com';

const headers = {
    'X-RapidAPI-Key': GEO_CITY_API_KEY,
    'X-RapidAPI-Host': GEO_CITY_API_HOST,
};

export async function fetchCityData(param) {
    console.log(param)
    try {
        const response = await axios.get(`${GEO_CITY_API_URL}&namePrefix=${param}`, { headers });
        return response.data; //devolverá los datos del response en lugar de la respuesta completa. Debo hacer el return para que sea visible el resultado en la otra funcion donde se utiliza
        // console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export async function fetchWeatherData(lat, lon) {
    const url = `${WEATHER_MAP_API_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
    const response = await axios.get(url);
    // console.log(response.data)
    return response.data;
}

export async function fetchForecastData(lat, lon) {

    const url = `${FORECAST_MAP_API_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
    const response = await axios.get(url);
    // console.log(response.data)
    return response.data;
}
