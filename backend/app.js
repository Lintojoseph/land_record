// app.js
const express = require('express');
const cors = require('cors');
const landRoutes = require('./routes/landRoutes');
const initializeDatabase = require('./database/initializeDb');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


initializeDatabase();

// Routes
app.use('/api', landRoutes);

module.exports = app;