import express from 'express';
import configViewEngine from './config/ViewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';
import Connection from './config/ConnectDB';
import configCORS from './config/Cors';

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// CORS
configCORS(app);

// test connect DB
Connection();

// config body parser
app.use(bodyParser.urlencoded()); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// config view engine
configViewEngine(app);

// init web routes and api
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log('App listening http://localhost:' + PORT);
});
