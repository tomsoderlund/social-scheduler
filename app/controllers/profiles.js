'use strict';

var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');

var Buffer = require('../../modules/buffer-api/src/buffer-api');
var buffer = new Buffer(process.env.BUFFER_ACCESS_TOKEN);

module.exports = {

	getProfiles: function (callback) {
		Profile.find({}, function (errFind, data) {
			callback(errFind, data);
		});
	},

	updateProfiles: function (callback) {
		buffer.getProfileInfo(function (err, profiles) {
			if (!profiles.error) {
				async.each(profiles, function (profile, cbEach) {
					console.log('Profile:', profile.service, profile.id);
					var properties = {
						bufferId: profile.id,
						service: profile.service,
						queueSize: profile.counts.pending
					}
					Profile.update({ bufferId: profile.id }, properties, { upsert: true }, cbEach);
				},
				callback);
			}
			else {
				callback(profiles.error, profiles);
			}
		});
	},

}