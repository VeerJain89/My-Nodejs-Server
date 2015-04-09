var Users = require('../models/users');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all users
	app.get('/api/users', function(req, res) {

		// use mongoose to get all users in the database
		Users.find(function(err, users) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(users); // return all users in JSON format
		});
	});

	// create user and send back all users after creation
	app.post('/api/users', function(req, res) {
		// create a user, information comes from AJAX request from Angular
		Users.create({
			username : req.query.username,
			password : req.query.password
		}, function(err, user) {
			if (err)
				res.send(err);

			// get and return all the users after you create another
			Users.find(function(err, users) {
				if (err)
					res.send(err)
				res.json(users);
			});
		});

	});

	// delete a user
	app.delete('/api/users/:user_id', function(req, res) {
		Users.remove({
			_id : req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);

			// get and return all the users after you create another
			Users.find(function(err, users) {
				if (err)
					res.send(err)
				res.json(users);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};