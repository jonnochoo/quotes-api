var mongoose = require('mongoose');

var quoteSchema = mongoose.Schema({
    author: String,    
    dateCreated: { type:Date, default: Date.now},
    source: String,
    text: { type: String, required: true },    
    tags: Array
})

var Quote = mongoose.model('quote', quoteSchema);

module.exports = Quote;