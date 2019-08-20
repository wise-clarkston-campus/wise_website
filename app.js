var express = require('express');
var timeout = require('timeout');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var session = require('express-session');
//var socket = require('socket.io');

var app = express(); 
app.use(session({ secret: 'session use', resave: true, saveUninitialized: true }));

var route = require('./application')
var port = process.env.PORT;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

// database
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '35.231.226.218',
  user: 'attu3000',
  password: 'Athu258025.',
  database: 'wise_db' 

});
connection.connect(function(err) {
	process.on('uncaughtException', function (err) {
    console.log(err);
});
});


//socket.io
// io.on('connection', function(socket){
// 	console.log('made socket connection')
// });


app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function(req, res){
	res.render('home');
});
app.get('/home', function(req, res){
	res.render('home');
});

app.get('/Signin', function(req, res){
	res.render('Signin');
});
app.post('/Signin', urlencodedParser,function(req, res){
	 req.session.email = req.body.signinEmail;
	 req.session.password = req.body.signinPassword;

	connection.query("SELECT * FROM login_table WHERE email = ?",[req.body.signinEmail], function(err, result,fields){
console.log(result[0].password);
		if(err){
			throw err;
		}
else{

	if(bcrypt.compareSync(req.body.signinPassword, result[0].password)){

   			 res.redirect(`/${result[0].name

   			 }/Forum`);
   			 res.end;
	}

		else{	
			res.redirect('Signin');
			res.end
				//console("poo");
			
			};
		}
		});
});

app.get('/Events', function(req, res){
	res.render('Events');
});

app.get('/profile/:name', function(req, res){
	var data = {age: 29, job: 'ninja', hobbies: ['eating', 'fighting', 'fishing']};
	res.render('profile' , {person: req.params.name, data: data});
});

app.listen(port, function(){
	console.log("app running")

});
app.listen(3000,'127.0.0.1' );
console.log('now listening to womeninstem: port 3000');

app.get('/Forum-success', function(req, res){
		connection.query("SELECT * FROM forum_table", function (err, result, fields) {
			timeout.timeout(100, function () { alert('Fired!'); });
    if (err) throw err;
    console.log(result);
    
    res.render('Forum-success',{data: result});
    });
 });

	app.get(`/:name/Forum`, function(req,res){
		if(req.session.email){
			connection.query("SELECT * FROM forum_table", function (err, result, fields) {
		    	if (err) throw err;
		  	    console.log(result);
		   		res.render('Forum',{data: result});
	 		});
		}
		else{
			    timeout.timeout(100, function () { alert('Fired!'); });

			res.redirect('/Forum-success');
		}
 	
		
	}); 
//Forum
	app.post(`/:name/Forum`,urlencodedParser,function(req, res){
	    let name = req.params.name;
		let message = req.body.input;
		let sql1 = "INSERT INTO forum_table (name, message)VALUES (?,?)" 
		connection.query(sql1,[name, message], function(err, result,fields){
	  		if(err) throw err;
		res.redirect(`/${name}/Forum`);
	});  

});  
	app.get('/Forum',urlencodedParser,function(req, res){
		connection.query("SELECT * FROM forum_table", function (err, result, fields) {
		    if (err) throw err;
		    console.log(result);
		    let name = req.params.name;
		
			res.render(`/${name}/Forum`, {data: result})
		});
	});

	
	app.post('/Forum',urlencodedParser,function(req, res){
		connection.query("SELECT * FROM forum_table", function (err, result, fields) {
		    if (err) throw err;
		    console.log(result[0].name);
			//data.push({item:req.body.input});
			//console.log("input");
			//console.log(req.body.input);
			//res.json({todos:data});
			//res.redirect('/Forum');
			res.render('Forum', {data: result})
		});
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

//Signup
app.post('/Signup', urlencodedParser, function(req, res){
	//console.log(req.body);
	var hash = bcrypt.hashSync(req.body.password, 9);
	//bcrypt.hash(req.body.password, 9, function(err, hash) {
		//if(err) throw err;
		let password = hash;
		let email = req.body.email;
	let name = req.body.name;
	let major = req.body.major;
	let campus = req.body.campus;

	let sql1 = "INSERT INTO login_table (email, password, name, major, campus) VALUES (?,?,?,?,?)" 
	connection.query(sql1,[email, password, name, major, campus], function(err, result){
  		if(err) throw err;
		//res.render('/Forum-success',{data: req.body});
		//res.render('/Forum-success');
		member = name;
		console.log(member);
	});
	res.redirect('/Signin');
	})
 	//res.render('/Forum');
  //connection.end();
	
////ifreq.session.email=true


	app.get(`/:name/logout`, function(req,res){
		
		req.session.destroy();
		res.redirect('/');

    });
    app.get(`/:name/home`, function(req,res){
		connection.query("SELECT * FROM forum_table", function (err, result, fields) {
   	    if(req.session.email){
			connection.query("SELECT * FROM forum_table", function (err, result, fields) {
		    	if (err) throw err;
		  	    console.log(result);
		   		res.render('home-success',{data: result});
	 		});
		}
		else{
			res.redirect('/home');
		}

		 });
    });

        app.get(`/:name/Events`, function(req,res){
		
		connection.query("SELECT * FROM forum_table", function (err, result, fields) {
    if(req.session.email){
			connection.query("SELECT * FROM forum_table", function (err, result, fields) {
		    	if (err) throw err;
		  	    console.log(result);
		   		res.render('Events-success',{data: result});
	 		});
		}
		else{
			res.redirect('/Events');
		}

		 });
 });


app.get('/Forum-success', function(req, res){
		
    if(req.session.email){
			connection.query("SELECT * FROM forum_table", function (err, result, fields) {
				if (err.fatal) {
        console.trace('fatal error: ' + err.message);}
		    	if (err) throw err;
		  	    console.log(result);
		   		res.render('Forum',{data: result});
	 		});
		}
		else{
			connection.query("SELECT * FROM forum_table", function (err, result, fields) {
				if (err.fatal) {
        console.trace('fatal error: ' + err.message);
      }
			res.render('/Forum-success',{data: result});
		
			 });
		}

 });
 	
 	app.get('/:name/Forum-success', function(req, res){
		connection.query("SELECT * FROM forum_table", function (err, result, fields) {
    if(req.session.email){
			connection.query("SELECT * FROM forum_table", function (err, result, fields) {
		    	if (err) throw err;
		  	    console.log(result);
		   		res.render('Forum',{data: result});
	 		});
		}
		else{
			res.redirect('/Forum-success');
		}
 });
 });

