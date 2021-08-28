const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyparser=require('body-parser');
const logger = require('morgan');
const multer=require('multer');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const meal=require('./routes/meal');
const favs=require('./routes/favs');

const cors=require('cors');

const app = express();

app.use(bodyparser.urlencoded({extended:true}))


//db connection
const db=require('./helper/db.js')();

//config
const config=require('./config');
app.set('api_secret_key',config.api_secret_key);

//middleware
const verifyToken=require('./middleware/verifyToken');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
//app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/', indexRouter);
//app.use('/api',verifyToken);
app.use('/api/users', usersRouter);

app.use('/api/meal',meal);
app.use('/api/favs',favs);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
