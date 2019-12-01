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
  text: DataTypes.STRING,
  file: DataTypes.STRING,
}, { sequelize, modelName: 'Wikispeech' });

sequelize.sync();


exports.findAll = async function() {

	var result = await Wikispeech.findAll();

	return result;
}

exports.create = async function(wikispeech){

	var result = await Wikispeech.create({ id: wikispeech.id , text: wikispeech.text });

	return result;

}