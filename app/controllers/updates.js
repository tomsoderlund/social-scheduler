'use strict';

var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var Update = mongoose.model('Update');

var Buffer = require('../../modules/buffer-api/src/buffer-api');
var buffer = new Buffer(process.env.BUFFER_ACCESS_TOKEN);

var DEBUG_MODE = false; // true means no real Buffer posting


var isVideo = function (url) {
	var fileExtension = url.substring(url.lastIndexOf('.')+1, url.length).toLowerCase();
	if (fileExtension === 'mp4' || fileExtension === 'mov')
		return true;
	else
		return false
}


module.exports = {

	makeUpdateFromArticle: function (profile, article) {

		var LINK_DUMMY = '123456789012345678901234'

		var appendTextIfThereIsSpace = function (oldText, appendText, separator, appendFirst) {
			// Link: 23 char, image 24
			if (profile.service !== 'twitter' || (oldText.length + appendText.length <= 116)) {
				if (appendFirst)
					oldText = appendText + separator + oldText;
				else
					oldText = oldText + separator + appendText;
			}
			return oldText;
		};

		var update = {};
		update.articleId = article._id;
		update.url = article.url;
		update.category = article.category;
		update.title = article.titles[Math.floor(Math.random() * article.titles.length)];
		update.originalTitle = article.titles[0];
		// Only images in 3/4
		if (Math.random() <= 0.75) {
			update.image = article.images[Math.floor(Math.random() * article.images.length)];
		}
		// Make text
		update.text = update.title;
		// TEMP: remove Media options for Buffer bug
		//if (profile.service === 'twitter') {
			update.text = update.title + '\n' + LINK_DUMMY;
		//}
		// Tags
		update.tags = _.shuffle(article.tags);
		if (update.tags.length > 0) {
			update.text = update.text + '\n';
		}
		for (var t in update.tags) {
			if (update.tags.hasOwnProperty(t) && typeof(update.tags[t]) === 'string') {
				update.text = appendTextIfThereIsSpace(update.text, '#'+update.tags[t], ' ', false);
			}
		}
		update.text = update.text.replace(LINK_DUMMY, update.url);
		update.text = update.text.replace('\n #', '\n#');
		return update;
	},

	scheduleUpdates: function (profile, updates, callback) {
		console.log('Schedule updates:', profile.service, _.pluck(updates, 'text'));

		async.each(updates, function (update, cbEach) {
			update.service = profile.service;

			var bufferOptions = {
				profile_ids: [profile.bufferId],
				text: update.text,
				media: {},
				now: false,
				attachment: true,
				// shorten: false,
				// top: false,
				// scheduled_at: null,
				// retweet: false,
			};
			bufferOptions.media.photo = update.image;
			bufferOptions.media.thumbnail = update.image; // only for Buffer dashboard

			// TEMP: remove Media options for Buffer bug
			// bufferOptions.media.link = update.url;
			// bufferOptions.media.picture = update.image;
			// bufferOptions.media.title = update.originalTitle;
			// //bufferOptions.media.description = ;

			if (!DEBUG_MODE) {
				// Not debug mode
				buffer.createUpdate(
					bufferOptions,
					function (errBuffer, results) {
						if (!errBuffer) {
							Update.create(update, cbEach);
						}
						else {
							console.log('Buffer error:', errBuffer, results);
							cbEach();
						}
					}
				);
			}
			else {
				// Debug mode: just add to database
				Update.create(update, cbEach);
			}
		},
		callback)
	},

	getPendingUpdates: function (profile, callback) {
		buffer.getPendingUpdates(
			profile.bufferId,
			function (errBuffer, results) {
				console.log('getPendingUpdates', errBuffer, results);
				callback(errBuffer, results);
			}
		);
	},

}