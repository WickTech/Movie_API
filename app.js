// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb'); // Import MongoDB native driver

// Create an instance of Express
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Define MongoDB connection URL and Database name
const url = 'mongodb+srv://rishi:rishi@cluster0.qnk3q4f.mongodb.net/moviesDB?retryWrites=true&w=majority';
const dbName = 'moviesDB';

// Define endpoint to add a single movie
app.post('/add-movie', async (req, res) => {
    // Extract movie data from request body
    const { name, rank, id } = req.body;
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);

        // Insert movie document into collection
        await db.collection('movies').insertOne({ name, rank, id });

        // Close MongoDB connection
        client.close();
        
        // Send success response
        res.status(201).send('Movie added successfully');
    } catch (err) {
        // Send error response
        res.status(500).send('Error adding movie to database');
    }
});

// Define endpoint to add multiple movies
app.post('/add-movies', async (req, res) => {
    // Extract movies array from request body
    const movies = req.body;
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);

        // Insert multiple movie documents into collection
        await db.collection('movies').insertMany(movies);

        // Close MongoDB connection
        client.close();
        
        // Send success response
        res.status(201).send('Movies added successfully');
    } catch (err) {
        // Send error response
        res.status(500).send('Error adding movies to database');
    }
});

// Define endpoint to get all movies
app.get('/get-all', async (req, res) => {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);

        // Fetch all movie documents from collection
        const movies = await db.collection('movies').find().toArray();

        // Close MongoDB connection
        client.close();
        
        // Send response with fetched movies
        res.status(200).json(movies);
    } catch (err) {
        // Send error response
        res.status(500).send('Error fetching movies from database');
    }
});

// Define endpoint to get single movie by ID
app.get('/get-single', async (req, res) => {
    // Extract movie ID from query parameters
    const { id } = req.query;
    try {
        // Validate that the ID is not empty and is a string
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid movie ID');
        }

        // Connect to MongoDB
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);

        // Fetch single movie document from collection based on ID
        const movie = await db.collection('movies').findOne({ id });

        // Close MongoDB connection
        client.close();

        // If movie found, send it in the response
        if (movie) {
            res.status(200).json(movie);
        } else {
            // If movie not found, send a 404 Not Found response
            res.status(404).send('Movie not found');
        }
    } catch (err) {
        // Send error response
        console.error(err); // Log the error for debugging purposes
        res.status(500).send('Error fetching movie from database');
    }
});

// Define endpoint to get paginated movies
app.get('/get-paginated', async (req, res) => {
    // Extract pagination parameters from query
    const { page, size } = req.query;
    try {
        // Convert page and size to integers
        const pageNum = parseInt(page);
        const pageSize = parseInt(size);
        
        // Calculate skip value based on pagination parameters
        const skip = (pageNum - 1) * pageSize;

        // Connect to MongoDB
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);

        // Fetch paginated movies from collection
        const movies = await db.collection('movies').find().skip(skip).limit(pageSize).toArray();

        // Close MongoDB connection
        client.close();
        
        // Send response with paginated movies
        res.status(200).json(movies);
    } catch (err) {
        // Send error response
        res.status(500).send('Error fetching paginated movies from database');
    }
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
