
var Request = require("request");
const config = require('config');


var wikipedia_model = require("../models/wikipedia.js");

var wikispeech_model = require("../models/wikispeech.js");

var amazon_model = require("../models/amazon.js");


exports.requestPage = async function(req, res) {

	var content = await wikipedia_model.query(req.params.title.normalize('NFC'));

	var result = content.message.query.pages.map( async function(pagina){

		var wikiSpeech = await wikispeech_model.create( { id : pagina.pageid, text : pagina.extract ,
		title : pagina.title } );

		return { id : pagina.pageid, text : pagina.extract ,title : pagina.title };

	});

	Promise.all(result).then((completed) => {
		
		res.send(completed);

	}); 

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

exports.createSoundFile = async function(req, res){

	var id = parseInt(req.params.id);

	var wikipage = await wikispeech_model.selectById(id);

	if(wikipage){

		var amazonSpeech = await amazon_model.createSpeech( wikipage.title, wikipage.text);

		var result = await wikispeech_model.updatePath(wikipage.id, amazonSpeech.path );

		res.send(result);

	}else{

		res.send( {'status' : config.status.failed, 'message' : "failed to find the wiki file"});

	}


}

exports.clean = async function(req, res){

	var result = await wikispeech_model.cleanAll();

	res.send(result);

}
