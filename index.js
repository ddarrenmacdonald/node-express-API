var express = require('express');
// Added in the Body Parser Middleware
var bodyParser = require('body-parser');

var app = express();
// Adds functionality to parse json data
app.use(bodyParser.json({ type: 'application/json' }));


// Create the router for Photos
var photoRouter = express.Router();

// Get request to root resource
photoRouter.get('/', function(req, res) {});

// Post request to root
photoRouter.post('/', function(req, res) {});

// Request to get a specific object
photoRouter.get('/:id', function(req, res) {});

// Adding a PATCH request to specific object
photoRouter.patch('/:id', function(req, res) {});

// Deletion of a specific object
photoRouter.delete('/:id', function(req, res) {});

// This attaches the router to a path
app.use('/photo', photoRouter);

//See comments above for the logic
var albumRouter = express.Router();
albumRouter.get('/', function(req, res) {});
albumRouter.post('/', function(req, res) {});
albumRouter.get('/:id', function(req, res) {});
albumRouter.patch('/:id', function(req, res) {});
albumRouter.delete('/:id', function(req, res) {});
app.use('/album, albumRouter');

function lookupPhoto(req, res, next) {
	// Access the ID param on the request object
	var photoId = req.params.id;
	// Build an SQL query to select the resource object by ID
	var sql = 'SELECT * FROM photo WHERE id = ?';
	postgres.client.query(sql, [photoId], function(err, results){
		if (err) {
			console.error(err);
			res.statusCode = 500;
			return res.json({ errors: ['Could not retrieve photo']});
		}
	// No results returned mean the object is not found
	if (results.rows.length === 0) {
		// Set the HTTP status code on res object
		res.statusCode = 404;
		return res.json({ errors: ['Photo not found']});
	}
	// Attach the photo property to the request
	// The data is now available in the handler function
	req.photo = results.row[0];
	next();
	});
}

// Attached to Node Modules
module.exports = app; 