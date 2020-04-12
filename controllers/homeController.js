var bodyParser = require('body-parser');
// var mongoose = require('mongoose');

// // Connect to the database
// mongoose.connect('mongodb+srv://gabcas:c0fiman@cluster0-lpt2w.gcp.mongodb.net/smartmazda?retryWrites=true&w=majority', {
// 	useUnifiedTopology: true,
// 	useNewUrlParser: true
// }).then(() => console.log('DB Connected!'))
// .catch(err => {
// console.log("DB Connection Error:", err.message);
// });;

// // Create schema - database blueprint

// var tripSchema = new mongoose.Schema({
// 	tripID: String,
	
// });

// var Trip = mongoose.model('Trip', tripSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('home', {});
	});
	app.get('/about', function(req, res) {
		res.render('about', {});
	});
};
