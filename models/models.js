var path = require('path');

//Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null, { dialect: 'sqlite', storage: 'quiz.sqlite'});

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join( __dirname, 'quiz'));

exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa tabla depreguntas en DB
sequelize.sync().success(function(){
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if(count === 0) {
			Quiz.create({ pregunta: 'Capita de Italia', repuesta: 'Roma'})
			.success(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});