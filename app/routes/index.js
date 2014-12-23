var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET vueapp index */
router.get('/', function(req, res) {
  res.render('index', {});
});

module.exports = router;
