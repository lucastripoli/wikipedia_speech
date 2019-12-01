var express = require('express');
var router = express.Router();


//controller calls
var wikipedia_controller = require('../controllers/wikipedia.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/wikipedia', wikipedia_controller.allWikiSpeechs);
//router.get('/wikipedia/create', wikipedia_controller.addWikiSpeechs);
router.get('/wikipedia/request/:title', wikipedia_controller.requestPage);


module.exports = router;
