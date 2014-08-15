var crypto = require('crypto');
var express = require('express');
var mongoose = require('mongoose');

// ---
// ---
// ---

function sha1(input) {
	var shasum = crypto.createHash('sha1');

	// ---

	shasum.update(input);

	// ---

	return shasum.digest('hex');
}

// ---
// ---
// ---

var UserSchema = new mongoose.Schema({
	name: String,
	user: String,
	hash: String
});

// ---

var User = mongoose.model('User', UserSchema);

// ---

[['Administrator', 'admin', '123'], ['User', 'user', 'abc'], ['William Shakespeare', 'antony', 'cleopatra']].forEach(function (cred) {
	var instance = new User();

	// ---

	instance.name = cred[0];
	instance.user = cred[1];
	instance.hash = sha1(cred[2]);

	// ---

	instance.save();
});

// ---
// ---
// ---

var app = express();

// ---

app.set('views', __dirname);
app.set('view engine', 'jade');

// ---

app.use(require('body-parser').urlencoded({extended: true}));

// ---

app.get('/', function(req, res) {
	res.render('index', {});
});

app.post('/', function(req, res) {
	User.findOne({user: req.body.user}, function (err, user) {
		if (err) {
			return res.render('index', {message: err.message});
		}

		// ---

		if (!user) {
			return res.render('index', {message: 'Sorry!'});
		}

		// ---

		if (user.hash != sha1(req.body.pass)) {
			return res.render('index', {message: 'Sorry!'});
		}

		// ---

		return res.render('index', {message: 'Welcome back ' + user.name + '!!!'});
	});
});

// ---

var server = app.listen(49090, function () {
	mongoose.connect('mongodb://localhost/acme-no-login');

	// ---

	console.log('listening on port %d', server.address().port);
});

// ---
