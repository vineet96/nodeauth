var express = require('express');
var router = express.Router();
var User = require('../models/user');
var multer  = require('multer');
var upload = multer({ dest: './uploads/'});
var type = upload.single('profileimage');


/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
	res.render('register', {
		'title': 'Register'
	});
});

router.get('/login', function(req, res, next) {
	res.render('login', {
		'title': 'Login'
	});
});

router.post('/login', function(req, res, next) {
	res.render('login', {
		'title': 'Login'
	});
});


router.post('/register',type, function(req, res) {

	var name = 		req.body.name;
	var email = 	req.body.email;
	var username = 	req.body.username;
	var password = 	req.body.password;
	var password2 = req.body.password2;
	console.log('name : ' + name);
	console.log('username : ' + username);
	console.log('email : ' + email);
	console.log('password : ' + password);
	console.log('password2 : ' + password2);

	
	if(req.file.path){
		var path = req.file.path;
		var profileImageOrginalName     = req.file.originalname;
        var profileImageName            = req.file.originalname;
        var profileImageMimetype        = req.file.mimetype;
        var profileImagePath            = req.file.path;
        var profileImageExt             = req.file.extension;
        var profileImageSize            = req.file.size;
         console.log('path : ' + path);
        console.log('profileImageOrginalName : ' + profileImageOrginalName);
		console.log('profileImageName : ' + profileImageName);
		console.log('profileImageMimetype : ' + profileImageMimetype);
		console.log('profileImagePath : ' + profileImagePath);
		console.log('profileImageExt : ' + profileImageExt);

	}else{

 	var profileImageName = 'noimage.png';
	}

	
	req.checkBody('name', "name is required").notEmpty();
	req.checkBody('email', "email field is required").notEmpty();
	req.checkBody('email', "email fnot valid").isEmail();
	req.checkBody('username', "username field is required").notEmpty();
	req.checkBody('password', "password field is required").notEmpty();
	req.checkBody('password2', "password field is required").notEmpty();
	req.checkBody('password2', "passwords do not match").equals(password);
	
	var errors = req.validationErrors();
	if (errors) {
		res.render('register', {
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			password2: password2


		});

	} else {

		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password,
		    profileimage: profileImageName

		});
		User.createUser(newUser, function(err, user) {
			if (err) throw err;
			console.log(user);


		});

		req.flash('success', 'you are registered...');
		res.location('/');
		res.redirect('/');
	}


});

module.exports = router;