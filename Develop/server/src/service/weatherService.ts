import fs from 'node:fs/promises';
import dotenv from 'dotenv';

dotenv.config();

// Define an interface for the Coordinates object
// interface Coordinates {
//   cityName: string;
// }

// Define a class for the Weather object
class Weather {
  temperature: string;
  description: string;

  constructor(temperature: string, description: string) {
    this.temperature = temperature;
    this.description = description;
  }
}

// Define a class for the WeatherService
class WeatherService {
  baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org';
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
  }

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData() {
  //   let cityName = this.cityName;
  //   `api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={apikey}`}
  // TODO: Build parseCurrentWeather method
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method


  // Define a method to get weather data (either from file or API)
  async getWeatherForCity(city: string): Promise<Weather> {
    try {
      // Fetch weather data from the API
      let response = await fetch(`${this.baseURL}/data/2.5/forecast?q=${city}&appid=${this.apiKey}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const weather = this.parseCurrentWeather(data);
      return weather; // Return the weather data
    } catch (error) {
      console.error(`Error:`, error);
      throw error;
    }
  }

  // Define a method to read weather data from a file
  private async readWeatherData() {
    try {
      const data = await fs.readFile('db/searchHistory.json', 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
  }}

  // Parse the current weather data
  private parseCurrentWeather(data: any): Weather {
    const temperature = data.list[0].main.temp; // Get temperature from the first forecast item
    const description = data.list[0].weather[0].description; // Get weather description
    return new Weather(temperature, description);
  }

  // Retrieve existing weather history from file
  private async getWeatherHistory(): Promise<(Weather & { city: string })[]> {
    try {
      const weatherJson = await this.readWeatherData();
      return JSON.parse(weatherJson) || [];
    } catch (error) {
      return []; // Return an empty array if reading fails
    }
  }
}

export default new WeatherService();
