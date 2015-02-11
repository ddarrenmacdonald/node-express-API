var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({ type: 'application/json' }));

var postgres = require('./lib/postgres');


// Create the express router object for Photos
var photoRouter = express.Router();

// A GET to the root of a resource returns a list of that resource
photoRouter.get('/', function(req, res) { });

// A POST to the root of a resource should create a new object
photoRouter.post('/', function(req, res) { });

// We specify a param in our path for the GET of a specific object
photoRouter.get('/:id', function(req, res) { });

// Similar to the GET on an object, to update it we can PATCH
photoRouter.patch('/:id', function(req, res) { });

// Delete a specific object
photoRouter.delete('/:id', function(req, res) { });

// Attach the routers for their respective paths
app.use('/photo', photoRouter);

module.exports = app;