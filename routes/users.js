var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new/:username', function(req, res, next) {
  //DB에 새로운 Document(Record)를 생성해야함
  //id, username, score 필드로 구성
  //req.params.username;
  var username = req.params.username;

  res.status(200).send("{'id' : '00000000001', '" + username + "}");
});
module.exports = router;
