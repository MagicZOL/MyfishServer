//express객체를 변수에 넣어 접근하고자 할때 express변수를 쓸 예정
var express = require('express');
//외부로부터 들어오는 Get,POST 요청을 router변수에 저장
var router = express.Router();

//get방식은 보안상 취약하지만 요청하는것은 매우 쉽다

//자신의 Best Score 불러오기 #1 query스타일
router.get('/', function(req, res, next)
{
    var id = req.query.id;

    if(id === 'hong')
    {
        res.status(200).send("{'score', 70}");
    }
    else
    {
        res.status(200).send("{'score', 0}");
    }
});

//베스트 스코어를 등록하는 기능
router.post('/add', function(req, res, next)
{
    var bestScoreObj = req.body;
    var id = bestScoreObj.id;
    var bestScore = bestScoreObj,bestScore;

    res.status(200).send("{'result' : 'success'}");
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