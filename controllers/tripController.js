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
	startTime: String,
	duration: Number,
	avSpeed: Number,
	avRPM: Number,
	avEngineLoad: Number,
	avCoolantTemp: Number,
	avThrottlePos: Number,
	nSnaps: Number,
	snaps: [ Object ]
});

var Trip = mongoose.model('Trip', tripSchema);
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	app.get('/trips', function(req, res) {
		Trip.find({}, function(err, data) {
			if (err) throw err;
			res.render('trips', { trips: data, "secondsToHHMMSS": secondsToHHMMSS  });
		});
	});

	app.get('/trip', function(req, res) {
		// get data from mongodb and pass it to the view
		console.log('GET TRIP');
		if (req.query._id) {
			console.log('req.query._id', req.query._id);
			Trip.findById(req.query._id, function(err, data) {
				if (err) throw err;
				res.render('graph', { trips: [ data ], "secondsToHHMMSS": secondsToHHMMSS });
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
		console.log('DELETE TRIP');
		try {
			Trip.findOneAndDelete(req.query._id, function(err) {
				if (err) console.log(err);
				res.send('Successful deletion');
			});
		} catch (e) {
			print(e);
		}
	});
};

const secondsToHHMMSS = (sec) => {
	const days = Math.floor(sec / 86400);
	const hours = Math.floor((sec - days * 86400) / 3600);
	const minutes = Math.floor((sec - days * 86400 - hours * 3600) / 60);
	const seconds = Math.floor(sec - days * 86400 - hours * 3600 - minutes * 60);
	let result = '';
	if (days > 0) result += days.toString() + ' days ';
	if (hours > 0) result += hours.toString() + ' hours ';
	if (minutes > 0) result += minutes.toString() + "' ";
	result += seconds.toString() + '" ';

	return result;
};
