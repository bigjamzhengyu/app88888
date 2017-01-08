const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

// add comment 
app.set('port', (process.env.PORT || 5000));

// 很重要，这是让相关目录中的文件被访问到的保证（Css，图片）
app.use(express.static(__dirname + '/templates'));

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

//app.listen(5000);
var server = app.listen(app.get('port'), function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Running app at http://%s:%s', host, port);
});