import dotenv from 'dotenv'; // dotenv for reading port number from environment file
import express, {} from 'express';
import path from 'path';
dotenv.config(); // calling config reads .env file and loads variables int process.env

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url); // gives the url of the current module
const __dirname = path.dirname(__filename); // gets directory name of current module file

// Import the routes
import routes from './routes/index.js';

const app = express(); // initialize express

const PORT = process.env.PORT || 3001; // assigns the PORT for use
console.log('GET request received at server.ts.');
// Serve static files of entire client dist folder
app.use(express.static((path.join(__dirname, '../../client/dist'))));
// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
