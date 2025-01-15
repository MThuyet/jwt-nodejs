import express from 'express';
import configViewEngine from './configs/ViewEngine';
import initWebRoutes from './routes/web';
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

// config view engine
configViewEngine(app);

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log('App listening http://localhost:' + PORT);
});
