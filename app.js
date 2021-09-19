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
const ingredients=require('./routes/ingredients');
var engine = require('consolidate');


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

//const wiewspath=path.join(__dirname,"./public/index.html")
//app.set('views', __dirname + '../public');
//app.engine('html', engine.mustache);
//app.set("views",wiewspath);
app.set('view engine', 'html');

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin','*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use(cors({origin:true,credentials:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/', indexRouter);
app.use('/api',verifyToken);
app.use('/api/users', usersRouter);

app.use('/api/meal',meal);
app.use('/api/favs',favs);
app.use('/api/ingredients',ingredients);


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
