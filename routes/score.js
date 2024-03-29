//express객체를 변수에 넣어 접근하고자 할때 express변수를 쓸 예정
var express = require('express');
//외부로부터 들어오는 Get,POST 요청을 router변수에 저장
var router = express.Router();
var mongodb = require('mongodb');

//get방식은 보안상 취약하지만 요청하는것은 매우 쉽다

//유저의 Best Score 불러오기 #1 query스타일
router.get('/:id', function(req, res, next)
{
    var id = req.params.id;
    var database = req.app.get("database")
    var users = database.collection("users");

    users.findOne({"_id" : mongodb.ObjectId(id)}, {projection: {_id:0, score:1}}, function(err, user)
    {
        if (err) res.status(500).json({error:err});
        res.json(user)
    });
    
});

//베스트 스코어를 등록하는 기능
router.post('/add', function(req, res, next)
{
    var bestScoreObj = req.body;
    var id = bestScoreObj.id;
    var score = bestScoreObj.score;

    var database = req.app.get("database")
    var users = database.collection("users");

    users.updateOne({_id: mongodb.ObjectId(id)},{ $set: {score: score} }, function(err, result)
    {
        if (err) res.status(500).json({error:err});
         res.status(200).send({"result" : "success"});
    });
});

//자신의 Best Score 불러오기 #2 path방식, params 사용
// router.get('/:username', function(req, res, next)
// {
//     var id = req.params.username;

//     if(id === 'hong')
//     {
//         res.status(200).send("{'score', 70}");
//     }
//     else
//     {
//         res.status(200).send("{'score', 0}");
//     }
// });

//자신의 Best Score 등록하기 #1
// router.get('/add', function(req, res, next)
// {
//     var id = req.query.id;
//     var score = req.query.score;

//     res.status(200).send("{'result' : 'success'}");
// });

//자신의 Best Score 등록하기 #2
// router.get('/add/:id/:score', function(req, res, next)
// {
//     var id = req.params.id;
//     var score = req.params.score;

//     res.status(200).send("{'result' : 'success'}");
// });
module.exports = router;