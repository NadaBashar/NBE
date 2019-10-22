var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('disclaimerAr');
});

module.exports = router;
