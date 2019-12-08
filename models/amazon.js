const AWS = require('aws-sdk')
const fsp = require('fs').promises;
const config = require('config'); 

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})


exports.createSpeech = async function(title, text){

	var params = { 
	    'Text': text,
	    'OutputFormat': config.amazonpolly.OutputFormat,
	    'VoiceId': config.amazonpolly.VoiceId,
	    'LanguageCode' : config.amazonpolly.LanguageCode
	}

	var status = await Polly.synthesizeSpeech(params).promise().then(  (data) => {
	    if (data) {
	        if (data.AudioStream instanceof Buffer) {

	        	var url = "public/speechs/"+ title +".mp3";

	            try {
				    fsp.writeFile(url, data.AudioStream);
				    return {status: config.status.success, message: "speech was saved", path: url};
				} catch (error){
				    return {status: config.status.failed, message: error};
				}

	        }
	    }
	}).catch( (error) =>  {return { status: config.status.failed , message: error} }) ;

	return status;

}