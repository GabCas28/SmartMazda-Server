var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jQuery = require('jquery');
// Connect to the database
db = mongoose
	.connect('mongodb+srv://gabcas:c0fiman@cluster0-lpt2w.gcp.mongodb.net/SmartMazda?retryWrites=true&w=majority', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => console.log('DB Connected!'))
	.catch((err) => {
		console.log('DB Connection Error:', err.message);
	});

// Create schema - database blueprint

var tripSchema = new mongoose.Schema({
	tripID: String,
	avSpeed: Number,
	avRPM: Number,
	avEngineLoad: Number,
	speed: [ Number ],
	rpm: [ Number ],
	engineLoad: [ Number ]
});

var Trip = mongoose.model('Trip', tripSchema);
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	app.get('/trips', function(req, res) {
		Trip.find({}, function(err, data) {
			if (err) throw err;
			res.render('trips', { trips: data });
		});
	});

	app.get('/trip', function(req, res) {
		// get data from mongodb and pass it to the view
		console.log('GET TRIP');
		if (req.query._id) {
			console.log(req.query._id);
			Trip.findById(req.query._id, function(err, data) {
				if (err) throw err;
				res.render('graph', { trip: data });
			});
		}
	});

	app.post('/trip', urlencodedParser, function(req, res) {
		console.log('POST TRIP');
		// var newtrip = Trip(req.body).save(function(err,data){
		// 	if(err) throw err;
		// 	res.json(data);

		// });
		Trip.findById(req.body._id, function(err, data) {
			if (err) throw err;
			res.render('graph', { trip: data });
		});
	});

	app.delete('/trip/:item', function(req, res) {
		Trip.find({ item: req.params.item.replace(/\-/, ' ') }).remove(function(err, data) {
			if (err) throw err;
			res.json(data);
		});
	});
};
