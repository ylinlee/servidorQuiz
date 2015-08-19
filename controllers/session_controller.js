// MW de autorizacion de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};
// Get /login -- Formulariode login
exports.new = function(req, res) {

	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

// POST /login -- Crear la sesion
exports.create = function(req, res) {

	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if(error){
			req.session.errors = [{'message': 'Se ha producido un error: ' + error}];
			res.redirect('/login');
			return;
		}

		// Crear req.session.user y guardar campos id y username
		// La sesion de define por la existencia de: req.session.user
		req.session.user = {id: user.id, username: user.username};

		//Guardar el inicio de sesion
		var startTime = new Date();
		req.session.startTime = startTime.getTime();
		console.log('El usuario ' + user.username + ' se ha logado a las ' + startTime );

		console.log('Redireccion a path anterior a login ' + req.session.redir.toString());
		res.redirect(req.session.redir.toString()); // redireccion a path anterior a login
	});
};

// DELETE /logout -- Destruir sesion
exports.destroy = function(req, res){
	delete req.session.user;
	delete req.session.startTime;
	delete req.session.endTime;
	res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};

exports.sessionExpired = function(req, res){
	if(req.session.endTime){
		console.log('La sesion del usuario ' + req.session.user.username + ' ha terminado a las ' + req.session.endTime);
		delete req.session.user;
		delete req.session.endTime;
		req.session.errors = [{ 'message' : 'La sesion ha caducado vuelva a logearse de nuevo'}];
		res.redirect('/login');
	}
};