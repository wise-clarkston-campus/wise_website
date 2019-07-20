var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// database
var express = require('express');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'sql9.freemysqlhosting.net',
  user: 'sql9298213',
  password: 'BSB9SMk3NT',
  database: 'sql9298213' 

});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*
  var sql = "INSERT INTO login_table(email, password) VALUES('test@test.com','test')"
  connection.query(sql, function(err, result){
  	if(err) throw err;
  	console.log('inserted');
  });
  connection.end();*/
});

var data= [{item: 'get milk' },{item: 'walk dog' },{item: ' kick some coding ass' }];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports= function(app){

	app.get('/Forum', function(req,res){
		res.render('Forum',{todos: data});
	});     

	
	app.post('/Forum',urlencodedParser,function(req, res){
		
		data.push({item:req.body.input});
		console.log("input");
		console.log(req.body.input);
		//res.json({todos:data});
		//res.redirect('/Forum');
		res.render('Forum', {todos: data})
	});
	
	app.delete('/Forum/:item',function(req, res){
		data= data.filter(function(todo){
			return todo.item.replace(/ /g,'-')!== req.params.item;
		});
		//res.json(data);
	});

	app.get('/Signup', function(req, res){
		res.render('Signup',{qs: req.query});
	});

app.post('/Signup', urlencodedParser, function(req, res){
	//console.log(req.body);
	
		//put variables
		let email = req.body.email;
		let password = req.body.password;
		let name = req.body.name;
		let major = req.body.major;
		let campus = req.body.campus;
		let repassword = req.body.repassword;

		let sql1 = "INSERT INTO login_table (email, password, name, major, campus,repassword) VALUES (?,?,?,?,?,?)" 
		connection.query(sql1,[email, password, name, major, campus, repassword], function(err, result){
	  		if(err) throw err;
			//res.render('/Forum-success',{data: req.body});
			//res.render('/Forum-success');
			console.log('data entered');
			//console.log(req.body);

		})
		res.redirect('/Forum');
	 	//res.render('/Forum');
	  //connection.end();
	
	});

};