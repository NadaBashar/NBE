var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('disclaimerEn');
});

module.exports = router;
