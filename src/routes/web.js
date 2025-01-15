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
  router.post('/user/create-user', HomeController.handleCreateUser);
  router.post('/user/delete-user/:id', HomeController.handleDeleteUser);
  router.post('/user/update-user/', HomeController.handleUpdateUser);
  router.get('/user/update-user/:id', HomeController.getUpdateUserPage);

  return app.use('/', router); // ứng dụng bắt đầu với /
};

export default initWebRoutes;
