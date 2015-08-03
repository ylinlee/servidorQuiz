var models = require('../models/models.js');

// Autoload - factoriza el codigo se la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe quizId=' + quizId));
		}
	}).catch(function(error){
		next(error);
	});
};

// GET /quizes
exports.index = function(req, res, next){

  var searchParam = req.query.search;
  var searchExpresion = '%' + searchParam + '%';
  //Por defecto descendente
  var query = {
    where: { 
        pregunta: {
          like: searchExpresion
      }
    }
  };

  var findQuizes = models.Quiz.findAll();

  if( searchParam ) {
    console.log('exist');
    findQuizes = models.Quiz.findAll(query);
  }

	findQuizes.then(function(quizes){
		res.render('quizes/index', { quizes: quizes });
	}).catch(function(error){
		next(error);
	});
};

//GET /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', { quiz: req.quiz });
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
    if(req.query.respuesta === req.quiz.respuesta){
    	res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Correcto'});
    } else {
        res.render('quizes/answer', { quiz: req.quiz, respuesta: 'Incorrecto'});
    }
};

// GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build(
		// crea objeto quiz
		{pregunta: 'Pregunta', respuesta: 'Respuesta'}
	);

	res.render('quizes/new', {quiz: quiz} );
};

// POST /quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);

	//guarda en BD los campos pregunta y respuesta de quiz
	quiz.save({fields: ['pregunta', 'respuesta']}).then(function(){
		res.redirect('/quizes');
	}); // Redireccion HTTP (URL relativo) lista de preguntas
};