
var express = require('express');
var bodyParser = require('body-parser');
var app = express(); 
var route = require('./application')

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/home', function(req, res){
	res.render('home');
});
app.get('/Signin', function(req, res){
	res.render('Signin');
});

app.get('/Events', function(req, res){
	res.render('Events');
});

app.get('/profile/:name', function(req, res){
	var data = {age: 29, job: 'ninja', hobbies: ['eating', 'fighting', 'fishing']};
	res.render('profile' , {person: req.params.name, data: data});
});


route(app);

app.listen(2000,'127.0.0.1' );
console.log('now listening to port 2000');

