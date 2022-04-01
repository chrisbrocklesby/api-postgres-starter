import * as baseController from './controllers/baseController.js';
import * as userController from './controllers/userController.js';
import * as postController from './controllers/postController.js';
import * as errorController from './controllers/errorController.js';

export default (route) => {
  // Base Routes
  route.get('/', baseController.index);

  // User Routes
  route.post('/user/register', userController.register);
  route.post('/user/login', userController.login);
  route.get('/user/verify', userController.verify);
  route.post('/user/forgot', userController.forgot);
  route.post('/user/logout', userController.auth, userController.logout);

  // Post Routes
  route.get('/posts', userController.auth, postController.index);
  route.post('/posts', userController.auth, postController.create);
  route.get('/posts/:id', userController.auth, postController.find);
  route.patch('/posts/:id', userController.auth, postController.update);
  route.delete('/posts/:id', userController.auth, postController.remove);

  // Error Routes
  route.use(errorController.notFound);
  route.use(errorController.errorHandler);
};
