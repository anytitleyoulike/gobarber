const express = require('express');
const multerConfig = require('../src/config/multer');
const upload = require('multer')(multerConfig);

const routes = express.Router();
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const DashboardController = require('./app/controllers/DashboardController');
const FileController = require('./app/controllers/FileController');
const AppointmentController = require('./app/controllers/AppointmentController');
const AvailableController = require('./app/controllers/AvailableController');

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

routes.get('/app/dashboard', DashboardController.index);

routes.get('/app/logout', SessionController.destroy);

routes.get('/files/:file', FileController.show);

routes.get('/app/appointments/new/:provider', AppointmentController.create);

routes.get('/app/available/:provider', AvailableController.index);
module.exports = routes;
