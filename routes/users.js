var express = require('express');
var router = express.Router();

router.get('/new/:username', function(req, res, next) {
  var username = req.params.username;
  var database = req.app.get('database');
  var users = database.collection("users");
  
  users.insertOne({"username": username, "score": 0}, function(err, result)
  {
      if(err) throw err;
      
      var resultStr = '{"id":"' + result.insertedId.toString() +'", "username": "' + username + '"}';
      res.status(200).send(resultStr);
  });

  //res.status(200).send('{"id" : "00000000001","username" : "' + username + '"}');
});
module.exports = router;