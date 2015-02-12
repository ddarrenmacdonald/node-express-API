var express = require('express');
var app = express();

// Create the router for Photos
var photoRouter = express.Router();

// Get request to root resource
photoRouter.get('/', function(request, response) {});

// Post request to root
photoRouter.post('/', function(request, response) {});

// Request to get a specific object
photoRouter.get('/:id', function(request, response) {});

// Adding a PATCH request to specific object
photoRouter.patch('/:id', function(request, response) {});

// Deletion of a specific object
photoRouter.delete('/:id', function(request, response){});

// This attaches the router to a path
app.use('/photo', photoRouter);

//See comments above for the logic
var albumRouter = express.Router();
albumRouter.get('/', function(request, response) {});
albumRouter.post('/', function(request, response) {});
albumRouter.get('/:id', function(request, response) {});
albumRouter.patch('/:id', function(request, response) {});
albumRouter.delete('/:id', function(request, response) {});
app.use('/album, albumRouter');

// Attached to Node Modules
module.exports = app; 