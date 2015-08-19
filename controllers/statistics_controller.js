var models = require('../models/models.js');

var statistics = {
   	questions: 0,
    comments: 0,
    averageCperQ: 0,
    withComments: 0,
    withoutComments: 0
 };

var getQuestions = function(){
	return models.Quiz.count();
};

var getComments = function(){
	return models.Comment.count();
};

var getQuestionsWithComments = function(){
	return models.Quiz.count({
		distinct: true, 
		include: [{ 
			model: models.Comment, 
			required: true
		}]
	});
};

exports.show = function(req, res){
	getQuestions().then(function(questions){
		statistics.questions = questions;
		return getComments();
	}).then(function(comments){
		statistics.comments = comments;
		statistics.averageCperQ = statistics.questions ? (statistics.comments / statistics.questions).toFixed(2) : 0;
		return getQuestionsWithComments();
	}).then(function(withComments){
		statistics.withComments = withComments;
		statistics.withoutComments = statistics.questions - statistics.withComments;
		res.render('quizes/statistics/show', {statistics: statistics, errors: []});
	});
};