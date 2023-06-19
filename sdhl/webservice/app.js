const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer  = require('multer');
const fs = require('fs');
const FileStreamRotator = require('file-stream-rotator')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { v4: uuidv4 } = require('uuid');

const productionRouter = require('./routes/production/production');
const prjectRouter = require('./routes/project/project');
const newsRouter = require('./routes/news/news');
const userRouter = require('./routes/user/user');
const homebannerRouter = require('./routes/home/banner');
const recruitmentRouter = require('./routes/recruitment/recruitment');
const {fileFilter,ERRORCODE} = require('./utils');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'public/images'));
  },
  filename: function (req, file, cb) {
    let index= file.originalname.lastIndexOf(".");
    let ext = 'png';
    if(-1 !== index){
       ext = file.originalname.substr(index+1);
    }
    if('png' !== ext && 'jpg' !== ext){
      ext = 'png';
    }
    let filename= `${file.fieldname}_${uuidv4()}.${ext}`;
    cb(null, filename);
    req.originalname = filename;
  }
});

let upload = multer({ storage: storage, fileFilter:fileFilter}).single("image");

var app = express();

app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));

//initlogger
var logDirectory = path.join(__dirname, 'log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});
app.use(logger('combined', {stream: accessLogStream}))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 解决跨域问题
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(multer({ dest: '/images/',fileFilter:fileFilter}).array('image',1));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/production',productionRouter);
app.use('/project',prjectRouter);
app.use('/news',newsRouter);
app.use('/user',userRouter);
app.use('/homebanner',homebannerRouter);
app.use('/recruitment',recruitmentRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.get('/',(req,res)=>{
  res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/index.html', function (req, res) {
  res.sendFile( __dirname + "/" + "index.html" );
});

//处理图片上传
app.post('/file_upload', function (req, res) {
  upload(req, res, (err) =>  {
    let response = {Content:{
        Data:[
          {
            fileURL: `/images/${req.originalname}`,
          }
        ],
        PageInfo: null,
      },
      Message:{
        code:0,
        msg: 'upload success'
      }
    };
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log( err );
      response.Message.code = ERRORCODE.UPLOAD_FAILED.code;
      response.Message.msg = ERRORCODE.UPLOAD_FAILED.msg;
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log( err );
      response.Message.code = ERRORCODE.UPLOAD_FAILED.code;
      response.Message.msg = ERRORCODE.UPLOAD_FAILED.msg;
    }
    res.json(response);
  });
})

module.exports = app;
