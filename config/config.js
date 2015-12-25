var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	env = process.env.NODE_ENV || 'development';

var config = {

	development: {
		root: rootPath,
		app: {
			name: 'smart-social-scheduler'
		},
		port: 3009,
		db: 'mongodb://localhost/smart-social-scheduler-development'
		
	},

	test: {
		root: rootPath,
		app: {
			name: 'smart-social-scheduler'
		},
		port: 3000,
		db: 'mongodb://localhost/smart-social-scheduler-test'
		
	},

	production: {
		root: rootPath,
		app: {
			name: 'smart-social-scheduler'
		},
		port: 3000,
		db: process.env.MONGOLAB_URI || 'mongodb://localhost/smart-social-scheduler-production'

	}

};

module.exports = config[env];