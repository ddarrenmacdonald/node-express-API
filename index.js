var express = require('express');
// Added in the Body Parser Middleware
var bodyParser = require('body-parser');

var app = express();
// Adds functionality to parse json data
app.use(bodyParser.json({ type: 'application/json' }));

// Add the postgres
var postgres = require('./lib/postgres');

function lookupPhoto(req, res, next) {
	// Access the ID param on the request object
	var photoId = req.params.id;
	// Build an SQL query to select the resource object by ID
	var sql = 'SELECT * FROM photo WHERE id = $1';
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

// Create the router for Photos
var photoRouter = express.Router();

// Get request to root resource
photoRouter.get('/', function(req, res) {});

// Post request to root
photoRouter.post('/', function(req, res) {
	var sql = 'INSERT INTO photo (description, filepath, album_id) VALUES ($1,$2,$3) RETURNING id';
  var data = [
    req.body.description,
    req.body.filepath,
    req.body.album_id
  ];
  postgres.client.query(sql, data, function(err, result) {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.json({
        errors: ['Could not create photo']
      });
    }

    var photoId = result.rows[0].id;
    var sql = 'SELECT * FROM photo WHERE id = $1';
    postgres.client.query(sql, [ photoId ], function(err, result) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        return res.json({ errors: ['Could not retrieve photo after create'] });
      }

      res.statusCode = 201;
      res.json(result.rows[0]);
    });
  });
});

// Request to get a specific object
photoRouter.get('/:id', lookupPhoto, function(req, res) {
	res.json(req.photo);
});

// Adding a PATCH request to specific object
photoRouter.patch('/:id', function(req, res) {});

// Deletion of a specific object
photoRouter.delete('/:id', function(req, res) {});

// This attaches the router to a path
app.use('/photo', photoRouter);

/*
//See comments above for the logic
var albumRouter = express.Router();
albumRouter.get('/', function(req, res) {});
albumRouter.post('/', function(req, res) {});
albumRouter.get('/:id', function(req, res) {});
albumRouter.patch('/:id', function(req, res) {});
albumRouter.delete('/:id', function(req, res) {});
app.use('/album, albumRouter');
*/

// Attached to Node Modules
module.exports = app; 