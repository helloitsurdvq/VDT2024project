const express = require('express');
const path = require('path')
const cors = require('cors');
const morgan = require('morgan');
const db = require('./config');
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

const traineeRouter = require("./routes/traineeRoute")
app.use("/api/trainee", traineeRouter)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
  db();
});

module.exports = app;