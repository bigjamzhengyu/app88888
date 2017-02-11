const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// add comment 
app.set('port', (process.env.PORT || 5000));

// 很重要，这是让相关目录中的文件被访问到的保证（Css，图片）
app.use(express.static(__dirname + '/templates'));
// 解析表单用的
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', __dirname + '/templates');
console.log(app.get('views'));

const env = nunjucks.configure(app.get('views'), {
	autoescape: true,
	express: app
});

app.set('view engine', 'nunjucks');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/hello', (req, res) => {
	//console.log("Hello");
	db.collection('quotes').find().toArray((err, result) => {
	    if (err) return console.log(err);
	    res.render('base', {title:'Hello', name:'MyHello', quotes: result});
	});
});

app.post('/hello', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/hello');
  });
});

//app.listen(5000);
/*
var server = app.listen(app.get('port'), function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Running app at http://%s:%s', host, port);
});
*/

var db;
// 只有当数据库连接成功了，服务器才开启
MongoClient.connect('mongodb://dbMonger:dbMonger@ds159527.mlab.com:59527/star-war-quotes',(err,database)=>{
	if(err) return console.log(err);
	db = database;
	var server = app.listen(app.get('port'), function(){
		var host = server.address().address;
		var port = server.address().port;
		console.log('Running app at http://%s:%s', host, port);
	});
});