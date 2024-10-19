import dotenv from 'dotenv'; // dotenv for reading port number from environment file
import express, {} from 'express';
dotenv.config(); // calling config reads .env file and loads variables int process.env

// Import the routes
import routes from './routes/index.js';

const app = express(); // initialize express

const PORT = process.env.PORT || 3001; // assigns the PORT for use
console.log('GET request received at server.ts.');
// Serve static files of entire client dist folder
app.use(express.static('../../client/dist'));
// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
