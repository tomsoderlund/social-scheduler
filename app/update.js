#!/usr/bin/env node

'use strict';

var _ = require('lodash');
var async = require('async');

var init = require('./init');

var profiles = require('./controllers/profiles');
var articles = require('./controllers/articles');
var updates = require('./controllers/updates');

var SSS_QUEUE_LIMIT = process.env.SSS_QUEUE_LIMIT ? parseInt(process.env.SSS_QUEUE_LIMIT) : 1;


console.log('Smart Social Scheduler');

var scheduleUpdatesForProfiles = function (profiles, callback) {
	async.each(profiles, function (profile, cbEach) {
		//console.log('scheduleUpdatesForProfiles:', profile.service, profile.id);
		async.waterfall([
				function (cbWaterfall) {
					articles.getSuggestions(profile, SSS_QUEUE_LIMIT - profile.queueSize, cbWaterfall);
				},
				updates.scheduleUpdates
			],
			cbEach
		);
	},
	callback)
};

// Main flow
async.waterfall([
		profiles.updateProfiles,
		profiles.getProfiles,
		scheduleUpdatesForProfiles
	],
	function (err) {
		if (err) {
			console.error('SSS error:', err);
		}
		init.closeDatabase();
	}
);