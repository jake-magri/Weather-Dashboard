import dotenv from 'dotenv';

dotenv.config();

// Define an interface for the Coordinates object
// interface Coordinates {
//   cityName: string;
// }

// Define a class for the Weather object
class Weather {
  date: string; 
  icon: string;    
  iconDescription: string;  
  tempF: string; 
  windSpeed: string; 
  humidity: string;

  constructor(
    date: string, 
    icon: string,    
    iconDescription: string,  
    tempF: string, 
    windSpeed: string, 
    humidity: string) {
    this.tempF = tempF;
    this.date = date; 
    this.icon = icon;    
    this.iconDescription = iconDescription;  
    this.windSpeed = windSpeed; 
    this.humidity = humidity;
  }
}

// Define a class for the WeatherService
class WeatherService {
  baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
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
      console.log(city);
      console.log('this is the url' +`${this.baseURL}/data/2.5/forecast?q=${city}&units=imperial&appid=${this.apiKey}`);
      let response = await fetch(`${this.baseURL}/data/2.5/forecast?q=${city}&units=imperial&appid=${this.apiKey}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const weather = this.parseCurrentWeather(data);
      return weather; // Return the new weather data object
    } catch (error) {
      console.error(`Error:`, error);
      throw error;
    }
  }

  // Define a method to read weather data from a file

  // Parse the current weather data
  private parseCurrentWeather(data: any): Weather {
    // Ensure there is data to parse
    if (!data || !data.list || data.list.length === 0) {
      throw new Error('Invalid weather data');
  }
  console.log('this is the package retrieved from the api'+data);
  // Extract the first forecast item
  const forecastItem = data.list[0];

  // Get the necessary weather information
  const date = new Date(forecastItem.dt * 1000).toISOString(); // Convert UNIX timestamp to ISO string
  const tempF = forecastItem.main.temp; // Temperature in Fahrenheit
  const icon = forecastItem.weather[0].icon; // Weather icon code
  const iconDescription = forecastItem.weather[0].description; // Description (can be same as `description`)
  const windSpeed = forecastItem.wind.speed; // Wind speed
  const humidity = forecastItem.main.humidity; // Humidity percentage
    return new Weather(date, icon, iconDescription, tempF, windSpeed, humidity);
  }
}

export default new WeatherService();
