import express from 'express';
import HomeController from '../controllers/HomeController';

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  // path, handler
  router.get('/', HomeController.handleHelloWorld);
  router.get('/user', HomeController.handleUserPage);

  return app.use('/', router); // ứng dụng bắt đầu với /
};

export default initWebRoutes;
