var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/location')
    .post(function(req, res) {
    	var location = req.body.location
        var twilio = require('twilio');
        var client = twilio('AC6e2b528536b3083476f251ac8a497168', '6b4655f60a9fa70931c06c71d2d1bba0');
        client.sendMessage({
          to: '6109373580',
          from: '4848044132',
          body: 'Sanket is at ' + location
        });
        res.json({ message: 'SMS sent' });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// /api/location/:Bayfair