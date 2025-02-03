import express from 'express';
import ApiController from '../controllers/ApiController';
import UserController from '../controllers/UserController';
import GroupController from '../controllers/GroupController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
  router.all('/*', checkUserJWT, checkUserPermission);

  // rest api GET, POST, PUT, DELETE
  router.post('/register', ApiController.handleRegister);
  router.post('/login', ApiController.handleLogin);
  router.post('/logout', ApiController.handleLogout);

  router.get('/account', UserController.getUserAccount);

  // users
  router.get('/user/read/', UserController.readFunc);
  router.post('/user/create', UserController.createFunc);
  router.put('/user/update', UserController.updateFunc);
  router.delete('/user/delete', UserController.deleteFunc);

  // Group
  router.get('/group/read/', GroupController.readFunc);

  return app.use('/api/', router);
};

export default initApiRoutes;
