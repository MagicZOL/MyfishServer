//테스트
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//라우터 파일에 있는 스크립트 등록
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var scoreRouter = require('./routes/score'); 

var app = express();

//Mogodb설정
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ZOLadmin:admin1234@cluster0-f0ard.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  //Database Name
  const dbName = 'Myfish';
  const db = client.db(dbName);
  app.set("database", db); //app은 express의 객체로 웹서버를 제어하는 코어
  //뒤 명령어를 앞 이름으로 접근하게 만드는 코드
  console.log("Connected successfully to server");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//역할 부여, /score로 들어오면 scoreRouter가 처리하라
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/score', scoreRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
