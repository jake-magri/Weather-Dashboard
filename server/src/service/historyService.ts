import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  weather: [{
    name: string;
    temperature: string;
    date: string;
    icon: string;
    iconDescription: string;
    tempF: string;
    windSpeed: string;
    humidity: string;
  }] | null;
  constructor(
    name: string,
    id: string,
    weather = null
  ) {
    this.name = name;
    this.id = id;
    this.weather = weather;
  }

}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read() {
    return await fs.readFile('db/searchHistory.json', {
      flag: 'r',
      encoding: 'utf8',
    });
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile(
      'db/searchHistory.json',
      JSON.stringify(cities, null, '\t')
    );
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read().then((citiesJson) => {
      let parsedCities: City[];

      // If cities isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedCities = [].concat(JSON.parse(citiesJson)); // If JSON.parse(citiesJson) returns an array, concat will return that array. If it returns a single object (not an array), 
        // concat will convert that object into an array with that object as the only element.
      } catch (err) {
        parsedCities = [];
      }

      return parsedCities;
    });
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string, weather: any) {
    if (!city) {
      throw new Error('City can not be blank');
    }
    const citiesArray = await this.getCities();
    let cityExists = false;
    let existingCity = new City('','',null);
    // Add a unique id to the city using uuid package
    for (let i = 0; i < citiesArray.length; i++) {
      if (city.toLowerCase() === citiesArray[i].name.toLowerCase()) {
        cityExists = true; // set the flag if a matching name is found
        existingCity = citiesArray[i]; // Store the existing city object
        break; // exit if city exists
      }
    }
    // if it doesnt exist, create a new one
    if (!cityExists) {
      const newCity: City = {
        name: city,
        id: uuidv4(),
        weather
      }
      console.log('this is a new city object with weather' + JSON.stringify(newCity));


      // Get all cities, add the new city, write all the updated cities, return the newCities
      return await this.getCities()
        .then((parsedCities) => {
          return [...parsedCities, newCity];
        })
        .then((updatedCities) => this.write(updatedCities))
        .then(() => newCity);
    } else {
      console.log('City already exists: ' + city);
      return existingCity;
  } }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    return await this.getCities().then((cities: City[]): City[] => { // get parsed cities
      return cities.filter(city => city.id !== id); // filter out passed id
    })
      .then((filteredCities) => this.write(filteredCities)) // write updated array back to file
  }
}


export default new HistoryService();
