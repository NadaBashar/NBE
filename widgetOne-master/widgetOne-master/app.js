var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('http-auth');

//var index = require('./routes/index');
var surveyEn = require('./routes/surveyEn');
var surveyAr = require('./routes/surveyAr');
var applyFormEn = require('./routes/applyFormEn');
var applyFormAr = require('./routes/applyFormAr');
/*var disclaimerEn = require('./routes/disclaimerEn');
var disclaimerAr = require('./routes/disclaimerAr');*/
var finalMessageEn = require('./routes/finalMessageEn');
var finalMessageAr = require('./routes/finalMessageAr');

let samplesAdminUser = process.env.BOTS_SAMPLES_USER || 'windis';
let samplesAdminPwd = process.env.BOTS_SAMPLES_PASSWORD || 'windis';
const basic = auth.basic({
    realm: "Bots Default Custom Component Service"
}, (username, password, callback) => {
    callback(username === samplesAdminUser && password === samplesAdminPwd);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/stylesheets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/surveyEn', surveyEn);
app.use('/surveyAr', surveyAr);
app.use('/applyFormEn', applyFormEn);
app.use('/applyFormAr', applyFormAr);
/*app.use('/disclaimerEn', disclaimerEn);
app.use('/disclaimerAr', disclaimerAr);*/
app.use('/finalMessageEn', finalMessageEn);
app.use('/finalMessageAr', finalMessageAr);

//app.use(auth.connect(basic));
//app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
