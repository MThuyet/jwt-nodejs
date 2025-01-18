import express from 'express';
import ApiController from '../controllers/ApiController';

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
  // rest api GET, POST, PUT, DELETE
  router.get('/test-api', ApiController.testApi);
  router.post('/register', ApiController.handleRegister);

  return app.use('/api/', router);
};

export default initApiRoutes;
