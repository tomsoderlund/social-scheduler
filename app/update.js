'use strict';

var _ = require('lodash');
var async = require('async');

var init = require('./init');

var profiles = require('./controllers/profiles');
var articles = require('./controllers/articles');
var updates = require('./controllers/updates');

var QUEUE_LIMIT = 1;



console.log('Smart Social Scheduler');

var scheduleUpdatesForProfiles = function (profiles, callback) {
	async.each(profiles, function (profile, cbEach) {
		console.log('Profile:', profile.service, profile.id);
		async.waterfall([
				function (cbWaterfall) {
					articles.getSuggestions(profile, QUEUE_LIMIT - profile.queueSize, cbWaterfall);
				},
				updates.postUpdates
			],
			cbEach
		);
	},
	callback)
};

async.waterfall([
		profiles.updateProfiles,
		profiles.getProfiles,
		scheduleUpdatesForProfiles
	],
	init.closeDatabase
);



/*

var func = function (err, data) {
};

Profile: twitter 52f668e51ad570307c000027
Profile: facebook 52f669165f83d92355000037
Profile: google 52f668b91ad5703e7700003a
Profile: linkedin 5308e22ee4c1560b72000112
*/

