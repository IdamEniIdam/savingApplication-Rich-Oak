var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var redirect = require('express-redirect');

var index = require('./routes/index');
var auth = require('./routes/auth');
var register = require('./routes/register');
var member = require('./routes/member');
var api = require('./routes/api');
var app = express();
redirect(app);
//Connect to Mongoose
const dbURI = process.env + "mongodb://localhost:27017/savingRentApplication";

mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));

    console.log("Connected to DB");
  }
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login',auth);
app.use('/register',register);
app.use('/member',member);
app.use('/api',api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




module.exports = app;
