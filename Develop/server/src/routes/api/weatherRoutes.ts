import { Router, type Request, type Response } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ message: 'City name is required' });
    }

    // Fetch weather data and save it to the history
    const weather = await WeatherService.getWeatherForCity(city);
    const savedCity = await HistoryService.addCity(city, weather); // TODO: save city to search history

    return res.status(200).json({ message: 'Weather added successfully', city: savedCity, weather: savedCity.weather});
  } catch (error) {
    console.error('Error fetching weather:', error);
    return res.status(500).json({ message: 'Error fetching weather data' });
  }

});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Unable to get cities', error });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.status(200).json({ message: 'City removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing city', error });
  }
});

export default router;
