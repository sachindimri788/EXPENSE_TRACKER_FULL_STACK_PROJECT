const express = require('express');
const router = require('./routes/indexRoutes');
require('dotenv').config({ path: '../env/development.env' })
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('../config/db');
const port = process.env.PORT || 3000;


const helmet = require("helmet");
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);


const morgan = require("morgan");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));



app.use(cors());
app.use('/', router);


app.listen(port, () => {
  console.log(`listening at port number ${port}`);
});