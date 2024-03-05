var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const passport = require('passport');
const socketIo = require('socket.io');
const http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/wp-content', express.static(__dirname + '/public/wp-content'));

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



// socket messages start
  const server = http.createServer(app);
  const io = socketIo(server);


  io.on('connection', (socket)=>{
    console.log("A user joined the chat");

    socket.on('message', (message)=>{
      console.log("Received: ", message);

      io.emit('message', message)

    });
    socket.on('disconnect', ()=>{
      console.log("User disconnected");
    })

  });




// socket messages end


module.exports = app;