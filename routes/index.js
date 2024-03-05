var express = require('express');
var router = express.Router();
var session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const socketIo = require('socket.io');
const http = require('http');
const message_schema = require("../message")


// authentication routes start
const users = [];
// Passport Configuration
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  const user = users.find(u => u.email === email);
  if (!user) return done(null, false, { message: 'Incorrect email.' });
  bcrypt.compare(password, user.password, (err, result) => {
      if (err) return done(err);
      if (result === false) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  const user = users.find(u => u.email === email);
  done(null, user);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', abc: "value 123" });
});


router.get("/signup", function( req, res) {
  res.render('signup');
});

router.post('/signup', function(req, res){
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({email, password: hashedPassword});

  console.log(users);

  res.redirect("/login");


})

router.get("/login", function( req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: '/login',
})); 
// authentication routes end

// socket messages start

router.get("/msg", function( req, res) {
  res.render('socket_message');
});
// socket messages end





module.exports = router;
