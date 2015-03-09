var express = require('express');
var Quote = require('../lib/Quotes')

var router = express.Router();
router.get('/', getAllTags);

module.exports = router;

// Private methods
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

function getAllTags(req, res){
  Quote.distinct('tags', function(err, data){
    return res.json(data.clean(''));
  });
};
