var express = require('express');
// Added in the Body Parser Middleware
var bodyParser = require('body-parser');
// Add in Express Validator
var expressValidator = require('express-validator');
// Add in the Multer middleware
var multer = require('multer');

var app = express();

// Adds functionality to parse json data
app.use(bodyParser.json({ type: 'application/json' }));
// We add the middleware after we load the body parser
app.use(expressValidator());

// Adds views
app.set('views', './views');
app.set('view engine', 'ejs');

// Add the postgres
var postgres = require('./lib/postgres');

app.get('/' , function(req,res) {
    res.sendfile('views/index.html');
} );

app.get('/db/readRecords', function(req,res){
    postgres.getRecords(req,res);
});

app.get('/db/addRecord', function(req,res){
    postgres.addRecord(req,res);
});

app.get('/db/delRecord', function(req,res){
    postgres.delRecord(req,res);
});

app.get('/db/createTable', function(req,res){
    postgres.createTable(req,res);
});

app.get('/db/dropTable', function(req,res){
    postgres.dropTable(req,res);
}); 

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/client')); 
app.use(express.errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// Attached to Node Modules
module.exports = app; 