var models = require('../models/models.js');

var statistics = {
   	questions: 0,
    comments: 0,
    averageCperQ: 0,
    unpublished: 0,
    published: 0
 };

var getQuestions = function(){
	return models.Quiz.count();
};

var getComments = function(){
	return models.Comment.count();
};

var getUnpublishedComments = function(){
	return models.Comment.count({where: {publicado: false}});
};

exports.show = function(req, res){
	getQuestions().then(function(questions){
		statistics.questions = questions;
		return getComments();
	}).then(function(comments){
		statistics.comments = comments;
		statistics.averageCperQ = statistics.questions ? (statistics.comments / statistics.questions).toFixed(2) : 0;
		return getUnpublishedComments();
	}).then(function(unpublished){
		statistics.unpublished = unpublished;
		statistics.published = statistics.comments - statistics.unpublished;
		res.render('quizes/statistics/show', {statistics: statistics, errors: []});
	});
};