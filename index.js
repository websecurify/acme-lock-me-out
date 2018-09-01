var crypto = require('crypto');
var express = require('express');
var Sequelize = require('sequelize');

function sha1(input) {
	var shasum = crypto.createHash('sha1');
	shasum.update(input);
	return shasum.digest('hex');
}

var sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},

	// SQLite only
	storage: 'database.sqlite',

	// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
	operatorsAliases: false
});

var User = sequelize.define('user', {
	name: Sequelize.STRING,
	user: Sequelize.STRING,
	hash: Sequelize.STRING
});

User.destroy({
	where: {},
	truncate: true
})
sequelize.sync().then(function () {
	var users = [
		['Administrator', 'admin', '123'],
		['User', 'user', 'abc'],
		['William Shakespeare', 'antony', 'cleopatra']
	]
	users.forEach(function (cred) {
		var instance = User.create({
			name: cred[0],
			user: cred[1],
			hash: sha1(cred[2])
		});
	});
	var app = express();

	app.set('views', __dirname);
	app.set('view engine', 'pug');

	app.use(require('body-parser').urlencoded({
		extended: true
	}));
	app.use(express.static('assets'));
	app.get('/', function (req, res) {
		res.render('index', {});
	});

	app.post('/', function (req, res) {
		User.find({
			where: {
				user: req.body.user
			}
		}).then(
			function (user) {
				if (!user) {
					return res.render('index', {
						message: 'I do not know you'
					});
				}
				if (user.hash != sha1(req.body.pass)) {
					return res.render('index', {
						message: 'Wrong password'
					});
				}
	
				return res.render('index', {
					message: 'Welcome ' + user.name + '!!!'
				});
			},
			function (err) {
				if (err) {
					return res.render('index', {
						message: err.message
					});
				}
			}
		);
	});

	var server = app.listen(49090, function () {
		console.log('listening on port %d', server.address().port);
	});
})