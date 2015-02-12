var express = require('express');
var app = express();

//Declared a new express router for Photo path
var photoRouter = express.Router();

//Used the "chaining" feature to refactor code
photoRouter.get(‘/’, function(req, res) { });
photoRouter.post(‘/’, function(req, res) { });
photoRouter.get(‘/:id’, function(req, res) { });
photoRouter.patch(‘/:id’, function(req, res) { });
photoRouter.delete(‘/:id’, function(req, res) { });
app.use(‘/photo’, photoRouter);

//Declared a new express router for Album path
var albumRouter = express.Router();

//Used the "chaining" feature to refactor code
photoRouter.get(‘/’, function(req, res) { });
albumRouter.get(‘/’, function(req, res) { });
albumRouter.post(‘/’, function(req, res) { });
albumRouter.get(‘/:id’, function(req, res) { });
albumRouter.patch(‘/:id’, function(req, res) { });
albumRouter.delete(‘/:id’, function(req, res) { });
app.use(‘/album’, albumRouter);

//Exported Node Module
module.exports = app;