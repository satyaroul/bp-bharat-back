var createError = require('http-errors');
var express = require('express');
const cors = require('cors'); 
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var salesRouter = require('./routes/sale');
var accountRouter = require('./routes/account');
var ledgerRouter = require('./routes/ledger');
var cashEntryRouter = require('./routes/cash_entry');
var purchaseRouter = require('./routes/purchase');
var inventoryRouter = require('./routes/inventory');
var salesmanRouter = require('./routes/salesman');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/salesman', salesmanRouter);
app.use('/items', itemsRouter);
app.use('/sales', salesRouter);
app.use('/accounts', accountRouter);
app.use('/ledger', ledgerRouter);
app.use('/cashEntry', cashEntryRouter);
app.use('/purchase', purchaseRouter);
app.use('/inventory', inventoryRouter);

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
