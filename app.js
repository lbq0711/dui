var http = require('http');
var express = require('express');
var routes = require('./routes');
//var dockerhome = require('./routes/dockerhome');

var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var handlebars = require('express3-handlebars').create({defaultLayout:'topbar'});
var session = require('express-session');
var logger = require('morgan');


app.set('port',process.env.PORT || 3000);
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.engine('handlebars',handlebars.engine);

app.use(logger('dev'));
app.use(bodyParser());

app.use(cookieParser());
app.use(session({secret: 'blog.fens.me', cookie: { maxAge: 600000 }}));
//app.use(passport.initialize());
//app.use(passport.session());

app.use(express.static(path.join(__dirname,'public')));

//init passport
var passr=require('./script/passport/passready');
passr.passready(app,passport,LocalStrategy);
//
app.get('/',routes.index);
app.post('/login',passport.authenticate('local',{
	successRedirect:'/home',
	failureRedirect:'/'

}));

app.all('/home',isLoggedIn);
app.get('/home',routes.home);
app.get('/logout',function(req,res) {
	req.logout();
	res.redirect('/');
});

http.createServer(app).listen(app.get('port'),function() {
	console.log('Express server listening on port '+app.get('port'));
});

function isLoggedIn(req,res,next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/');
}