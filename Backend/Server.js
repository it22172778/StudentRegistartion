const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB connected Successfully listening to " + process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
  