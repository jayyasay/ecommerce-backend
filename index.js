// index.js
const express = require('express')

const app = express()
const PORT = 4000

require("dotenv").config();

const mongoose = require("mongoose");

const ImageModel = require("./image.model");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

app.get("/api/db/products", (req, res) => {
    ImageModel.find().then((details) => {
      res.json(details);
    });
  });

// Export the Express API
module.exports = app