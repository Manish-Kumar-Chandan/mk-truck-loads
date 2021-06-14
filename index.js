const app = require('express')();
const express = require('express');

var http = require('http').Server(app);
var io = require('socket.io')(http);

const path = require('path');
const bodyParser = require('body-parser');
const getRouter = require('./router/Getrouter.js');
const postRouter = require('./router/postRouter');
const config = require('./config');

const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require('./models/user');
const passport = require('passport');

const Socket = require('./socket')

const MONGODB_URI = config.mongoUrl;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'truckloads_sessions'
});




// Access public folder from root
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('uploads'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static('public'));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(bodyParser.json())

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

Socket.init(io);

// GET Routes file with app
app.use('/', getRouter); 

app.use('/', postRouter);


//For set layouts of html view
var expressLayouts = require('express-ejs-layouts');
const { json } = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);


mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    http.listen(port, () => {
      console.log('App is Running on ' + port );
    });
  })
  .catch(err => {
    console.log(err);
  });
