var express = require('express'),
	config = require('./config/config'),
	init = require('./app/init');

var app = express();

require('./config/express')(app, config);

console.log('smart-social-scheduler running on http://localhost:' + (process.env.PORT || config.port));
app.listen(process.env.PORT || config.port);