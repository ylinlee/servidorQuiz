// Definicion del modulo de Quiz

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz', 
		{
			pregunta: {
				type: DataTypes.STRING,
				validate: { 
					notEmpty: {
						msg: '-> Falta Pregunta'
					}
				}
			},
			respuesta: {
				type: DataTypes.STRING,
				validate: { 
					notEmpty: {
						msg: '-> Falta Respuesta'
					}
				}
			},
			tema: {
				type: DataTypes.ENUM,
				values: [ 'humanidades', 'ocio', 'ciencia', 'tecnologia', 'otro' ],
				validate: {
					isIn: [[ 'humanidades', 'ocio', 'ciencia', 'tecnologia', 'otro' ]]
				}
			}
		}
	);
}