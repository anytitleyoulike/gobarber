const express = require('express');
const multerConfig = require('../src/config/multer');
const upload = require('multer')(multerConfig);

const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('../src/app/middlewares/auth');
const guestMiddleware = require('../src/app/middlewares/guest');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  console.log(res.locals);
  return next();
});

routes.use('/app', authMiddleware);

routes.get('/', guestMiddleware, SessionController.create);
routes.post('/signin', SessionController.store);

routes.get('/signup', guestMiddleware, UserController.create);
routes.post('/signup', upload.single('avatar'), UserController.store);

routes.get('/app/dashboard', (req, res) => {
  console.log(req.session.user);
  return res.render('dashboard');
});

routes.get('/app/logout', SessionController.destroy);

module.exports = routes;
