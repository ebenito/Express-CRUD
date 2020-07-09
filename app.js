var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let cnn = 'mongodb+srv://sa:TKVg6qgR14D5c6my@clusterxtv.qfdke.azure.mongodb.net/pruebas?retryWrites=true&w=majority';

var app = express();

//Conectamos a MongoDB; en producción creamos la variable de entorno con la cadena de conexión en producción, que incluye la password (asi no se verá publicamente al estar publicado en GIT) y en desarrollo usará la BD local.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pruebas'; 
console.log('Intentado conectar a MongoBD: ' + MONGO_URI);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(()=>console.log('Conectado con éxito a MongoDB'))
 .catch(console.error);

// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
