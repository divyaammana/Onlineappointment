var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var cons = require('consolidate');

var app = express();
// view engine setup
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

var mongojs=require('mongojs');
var db=mongojs('appointment',['appointmentlist']);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/personlist',function(req,res){
console.log('I received a get request');
db.appointmentlist.find(function(err, docs){
console.log('in database connection');
res.json(docs);
});
});

app.post("/personlist",function(req,res){
console.log(req.body);
db.appointmentlist.insert(req.body,function(err,doc){
console.log('hi');
res.json(doc);
});
});

app.delete("/personlist/:id",function(req,res){
var id=req.params.id;
console.log(id);
db.appointmentlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
res.json(doc);
});
console.log('removed');
});


app.get('/personlist/:id',function(req,res){
var id=req.params.id;
console.log(id);
db.appointmentlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
res.json(doc);
});
});

app.put('/personlist/:id',function(req,res){
var id=req.params.id;
console.log(req.body);
db.appointmentlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
update:{$set: {date:req.body.date,time:req.body.time,description:req.body.description}},new:true},function(err,doc){
res.json(doc);
});
});

app.use('/', routes);
app.use('/users', users);


var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


mongoose.connect('mongodb://127.0.0.1:27017/appointment');

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
