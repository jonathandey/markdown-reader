var marked = require('marked');
var express = require('express');
var fs = require('fs');
var exphbs  = require('express-handlebars');
var _ = require('underscore');

var app = express();

var docsDirPath = __dirname + '/../';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getDocFiles = function(dirPath, stringify) {
	var stringify = (stringify !== true) ? false : true;
	// Removes .files and directories
	var files = _.reject(fs.readdirSync(dirPath), function(filename){ return filename.indexOf('.') === 0 
		|| fs.statSync(dirPath + '/' + filename).isDirectory() });

	if(stringify)
		return JSON.stringify(files);

	return files;
}

var getMd = function(filePath) {
	var md = fs.readFileSync(filePath, { encoding: 'utf-8' });

	return marked(md);
}

app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('reader');
});

app.get('/doc/:file', function(req, res) {
	var mdFilePath = docsDirPath + '/' + req.params.file;

	res.render('file', {
		md: getMd(mdFilePath),
		layout: false,
	});
});

app.get('/index', function(req, res) {
	var docFiles = getDocFiles(docsDirPath);
	
	res.render('index', {
		docFiles: docFiles,
		layout: false,
	});

});

var portNumber = getRandomInt(3333, 5555);
console.log('Running on port: ' + portNumber);
app.listen(portNumber);
