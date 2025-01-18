import express from 'express';
import configViewEngine from './config/ViewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';
import Connection from './config/ConnectDB';

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// test connect DB
Connection();

// config body parser
app.use(bodyParser.urlencoded()); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// config view engine
configViewEngine(app);

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log('App listening http://localhost:' + PORT);
});
