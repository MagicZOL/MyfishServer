var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//날짜
router.get('/date', function(req, res, next)
{
  var date = new Date();
  if(date != undefined) //undefined : 객체가 생성되지 않은 경우
  {
    var dateObj = { date : date };
    res.status(200).send(dateObj);
  }
});

module.exports = router;
