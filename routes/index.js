var express = require('express');
var fs = require('fs');
var db = JSON.parse(fs.readFileSync("./db.json", "utf8"));
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', db);
});

module.exports = router;
