var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({ type: 'application/json' }));

var postgres = require('./lib/postgres');

function lookupPhoto(req, res, next) {
// We access the ID param on the request object
  var photoId = req.params.id;


// Create the express router object for Photos
var photoRouter = express.Router();
photoRouter.get('/', function(req, res) { });
photoRouter.post('/', function(req, res) {

// Build an SQL query to select the resource object by ID
	var sql = 'Insert into photo (description, filepath, album_id) VALEs ($1, $2, $3) RETURNING id';
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
	        errors: ['Failed to create photo']
	      });
	    }

	var newPhotoId = result.rows[0].id;
    var sql = 'SELECT * FROM photo WHERE id = $1';
    postgres.client.query(sql, [ newPhotoId ], function(err, result) {
      if (err) {
        // We shield our clients from internal errors, but log them
        console.error(err);
        res.statusCode = 500;
        return res.json({
          errors: ['Could not retrieve photo after create']
        });
      }
      // The request created a new resource object
      res.statusCode = 201;
      // The result of CREATE should be the same as GET
      res.json(result.rows[0]);
  });
});

// A GET to the root of a resource returns a list of that resource
photoRouter.get('/', function(req, res) { });

// A POST to the root of a resource should create a new object
photoRouter.post('/', function(req, res) { });

// We specify a param in our path for the GET of a specific object
photoRouter.get('/:id', function(req, res) {
	res.json(req.photo);
});

// Similar to the GET on an object, to update it we can PATCH
photoRouter.patch('/:id', function(req, res) { });

// Delete a specific object
photoRouter.delete('/:id', function(req, res) { });

// Attach the routers for their respective paths
app.use('/photo', photoRouter);

module.exports = app;