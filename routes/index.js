var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sesionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // autoload :quizId
router.param('commentId', commentController.load); // autoload :commentId

// Definicion de rutas de sesion
router.get('/login', sesionController.new);     // formulario login
router.post('/login', sesionController.create); // crear sesion
router.delete('/logout', sesionController.destroy);// destruir
router.get('/sessionExpired', sesionController.sessionExpired);// formulario session expirado

// Definicion de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sesionController.loginRequired, quizController.new);
router.post('/quizes/create', sesionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sesionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sesionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sesionController.loginRequired, quizController.destroy);

router.get('/quizes/statistics', statisticsController.show);

// Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sesionController.loginRequired, commentController.publish);

router.get('/author', function(req, res){
  res.render('author', { errors: [] });
});

module.exports = router;


