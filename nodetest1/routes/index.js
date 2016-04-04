var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});


router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render("register", {info: "Username already exists."})
        }
        passport.authenticate('local')(req, res, function () {
           if(req.body.username=="admin@gmail.com")
    res.render('new');
else
	res.render('users');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
	if(req.body.username=="admin@gmail.com")
    res.render('new');
else
	res.render('users');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;