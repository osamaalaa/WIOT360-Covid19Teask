var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();
const cors = require("cors");


app.use(cors({ origin: '*' }));

// Settings for CORS
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});
var port = 9000;
const server = app.listen(port)
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on('connection', (socket) => {

  console.log("New client connected");

  interval = setInterval(() => getApiAndEmit(socket), 3000);
  interval = setInterval(() => getApiAndEmit(socket), 3000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

}); // END SOCKET IO FUNCTION


const getApiAndEmit = socket => {
  const response = new Date();
  // // Emitting a new message. Will be consumed by the client
  let rawdata = fs.readFileSync(path.resolve(__dirname, 'covid.json'));
  let student = JSON.parse(rawdata);
  socket.emit("FromAPI", student);
  socket.emit('NewCases', Math.floor(Math.random() * 100));
  socket.emit('RecoverCases', Math.floor(Math.random() * 1000));

};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// LISTENING ON PORT...
console.log(`Server listening in on port ${port}`);
module.exports = app;
