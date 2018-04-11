import express from 'express';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import jwt from 'express-jwt';
import pino from 'express-pino-logger';

import logger from 'conf/logger';
import apiRoute from 'routes/api';
import homePages from 'routes/homePages';
import adminPages from 'routes/adminPages';
import pwdPages from 'routes/pwdPages';
import authRoutes from 'routes/auth';
import postRoutes from 'routes/posts';
import waitingpwd from 'routes/waitingpwd';
import search from 'routes/backend-search';

// Init app
const app = express();

// Setting body parser which allows express to read the body of post response
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// app.use(multipartMiddleware);

// View engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

// Passport configuration
app.use(session({
  secret: 'kb',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Set public folder
app.use(express.static(path.join(__dirname, 'src/public')));

// var getIP = require('ipware')().get_ip;

// app.use(function(req, res, next) {
//     var ipInfo = getIP(req);
//     logger.debug(ipInfo);
//     next();
// });

// Set routes

// middleware


app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
});


app.use(pino({
  logger,
}));

app.use('/', homePages);
app.use('/auth', authRoutes);
app.use('/home', homePages);
app.use('/admin', adminPages);
app.use('/pwd', pwdPages);
app.use('/posts', postRoutes);
app.use('/waitingpwd', waitingpwd);
app.use('/backend', search);
app.use('/api', jwt({ secret: 'shhhhhhared-secret' }).unless({ path: ['/api/user/token'] }), apiRoute);
//app.use('/api', apiRoute);
// Start the server
const port = 3000;

app.listen(port, () => {
  logger.debug(`Server started on ${port}`);
});
