
var Request = require("request");
const config = require('config');


var wikipedia_model = require("../models/wikipedia.js");

var wikispeech_model = require("../models/wikispeech.js");


exports.requestPage = async function(req, res) {

	var content = await wikipedia_model.query(req.params.title.normalize('NFC'));

	var result =  content.message.query.pages.map( async function(pagina){

		var wikiSpeech = await wikispeech_model.create( {id : pagina.pageid, text : pagina.extract} );

		return {id : pagina.pageid, text: pagina.extract};

	});

	res.send(result);

};

exports.allWikiSpeechs = async function(req, res){

	var allWikiSpeechs = await wikispeech_model.findAll();

	console.log(allWikiSpeechs);

	res.send(allWikiSpeechs);

}

exports.addWikiSpeechs = async function(req, res){

	var allWikiSpeechs = await wikispeech_model.create();

	console.log(allWikiSpeechs);

	res.send(allWikiSpeechs);

}

