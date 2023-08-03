const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;

require('dotenv').config();

const ImageModel = require('./image.model');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the application if MongoDB connection fails
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

app.get('/about', (req, res) => {
  res.send('This is my about route.....');
});

app.get('/api/db/products', (req, res) => {
  ImageModel.find().then((details) => {
    res.json(details);
  }).catch((err) => {
    console.error('Error fetching data from MongoDB:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});
