const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('config'); 

const sequelize = new Sequelize({
  dialect: config.sequelize.dialect,
  storage: config.sequelize.storage,
});


class Wikispeech extends Model {}

Wikispeech.init({
  id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
  title: DataTypes.STRING,
  text: DataTypes.STRING,
  file: DataTypes.STRING,
}, { sequelize, modelName: 'Wikispeech' });

sequelize.sync();


exports.findAll = async function() {

	var result = await Wikispeech.findAll();

	return result;
}

exports.create = async function(wikispeech){

	try{

		var result = await Wikispeech.create({ id: wikispeech.id , text: wikispeech.text, title: wikispeech.title });
	
	}catch(error){

		return error; 

	}

	return result;

}

exports.selectById = async function(id) {

	var result = await Wikispeech.findAll({
		where:{
			id : id
		}
	});

	if(result.length == 1){
		
		return result[0];

	}else{

		return false;

	}
}

exports.updatePath = async function(id, path){

	try{

		const [numberOfAffectedRows, affectedRows] = await Wikispeech.update({ path: wikispeech.id},
		{ where: { id : id}, returning: true, plain: true } );
	
	}catch(error){

		return error; 

	}

	return numberOfAffectedRows;

}


exports.cleanAll = async function(){

	var result = await Wikispeech.destroy({where: {}}).then(function () {});

	return result;

}
