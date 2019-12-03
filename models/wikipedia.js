
var Request = require('request');
const config = require('config'); 
const r2 = require("r2");

const getData = async url => {
  try {
  	console.log(url);
    const response = await r2(url).json;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};


function mountParameters( query = false ) {
    
    var urlToQuery = config.wikipedia.url;

    urlToQuery += "?" + config.wikipedia.parameters.join('&');

    if( query !== false){

    	urlToQuery += "&titles=" + query;

    }

    return urlToQuery;

};


exports.query = async function(query) {

	var urlToRequest = mountParameters(query.normalize('NFC'));

	try {

	 	var response = await r2(urlToRequest).json;


	 	if(response.error){
			
	 		return { status: config.status.failed , message: response.error.info };

		}

		return { status: config.status.success, message: response }

	 	
	} catch (error) {

    	return { status: config.status.failed , message: error };
  	
  	}

}