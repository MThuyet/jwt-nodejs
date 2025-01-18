import express from 'express';
import HomeController from '../controllers/HomeController';
import ApiController from '../controllers/ApiController';

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  // path, handler
  router.get('/', HomeController.handleHelloWorld);
  router.get('/user', HomeController.handleUserPage);
  router.post('/user/create-user', HomeController.handleCreateUser);
  router.post('/user/delete-user/:id', HomeController.handleDeleteUser);
  router.post('/user/update-user/', HomeController.handleUpdateUser);
  router.get('/user/update-user/:id', HomeController.getUpdateUserPage);

  // rest api GET, POST, PUT, DELETE
  router.get('/api/test-api', ApiController.testApi);

  return app.use('/', router); // ứng dụng bắt đầu với /
};

export default initWebRoutes;
