var express = require('express');
var quoteRouter = require("./routes");
var tagRouter = require("./tags");

var router = express.Router();
router.use('/api/quotes', quoteRouter);
router.use('/api/tags', tagRouter);

module.exports = router;