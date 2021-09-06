const express = require('express');
const app = express();
const port = 3009;

// const mongoose = require('../database/mongo');
const postgre = require('../database/postgre');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Everything is fine on port: ${port}`);
});