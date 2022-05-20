require("./helpers");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var validator = require("express-validator")
var bodyParser = require("body-parser");
var flash = require('connect-flash');

var indexRouter = require('./routes/index');

var app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	next();
});

app.use(bodyParser.json({ defaultCharset: "utf-8", limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = err;

	// render the error page
	res.status(err.status || 500);
	res.json({
		title: 'Banking Transactions'
	});
});

module.exports = app;