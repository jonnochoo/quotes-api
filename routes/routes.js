var express = require('express');
var Quote = require('../lib/Quotes')

var router = express.Router();
router.delete('/', removeQuote);
router.post('/', createQuote);
router.put('/:id', updateQuote);
router.get('/', getQuotes);  
router.get('/tag/:name', getQuoteByTag);
router.get('/random', getRandomQuote);
router.get('/:id', getQuote);

module.exports = router;

// Private methods
function createQuote(req, res) {
  var quote = new Quote(req.body);
  quote.save(function(err, quote){
    if(err){
      console.error(err)
      res.send(404)
      return;
    }
    res.location('/api/quotes/' + quote._id);
    res.send(201)
  })  
};

function getQuote(req, res) {
  Quote.findById(req.params.id, function(err, quote){
    if(err) console.error(err)
    if(quote) {
      res.json(quote);
    }
    else{
      res.send(404);
    }
  });   
};

function getRandomQuote(req, res) {
  Quote.count({}, function(err, count){
    if(err) console.error(err)
    var rand = Math.floor(Math.random() * count);
    Quote.findOne().skip(rand).exec(function(err, quote){
      res.json(quote);
    });    
  });  
};

function updateQuote(req, res) {
  var quote = new Quote(req.body);  
  Quote.findByIdAndUpdate(req.params.id, req.body, function(err, quote){
    if(err) console.error(err)
    return res.json(quote);
  });   
};

function getQuotes(req, res) {
  Quote.find(function(err, quotes){
    if(err) console.error(err)
    res.json(quotes);
  });   
};

function removeQuote(req, res) {
  Quote.findByIdAndRemove(req.body.id, function(err, quote){
    if(err) console.error(err)
    if(quote) {
      res.json(quote);
    }
    else{
      res.send(404);
    }
  });   
};


function getQuoteByTag(req, res){
  Quote.find({tags: req.params.name}, function(err, data){
    return res.json(data);
  });
};