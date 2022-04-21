import * as baseController from './controllers/baseController.js';
import * as userController from './controllers/userController.js';
import * as postController from './controllers/postController.js';
import * as errorController from './controllers/errorController.js';

export default (route) => {
  // Base Routes
  route.get('/', baseController.index);

  // User Routes
  route.post('/users/register', userController.register);
  route.post('/users/login', userController.login);
  route.get('/users/verify', userController.verify);
  route.post('/users/forgot', userController.forgot);
  route.post('/users/logout', userController.auth, userController.logout);

  // Post Routes
  route.get('/posts', postController.index);
  route.post('/posts', userController.auth, postController.create);
  route.get('/posts/:id', userController.auth, postController.find);
  route.patch('/posts/:id', userController.auth, postController.update);
  route.delete('/posts/:id', userController.auth, postController.remove);

  // Error Routes
  route.use(errorController.notFound);
  route.use(errorController.errorHandler);
};
