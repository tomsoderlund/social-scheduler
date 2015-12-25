'use strict';

var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var Update = mongoose.model('Update');

var Buffer = require('../../modules/buffer-api/src/buffer-api');
var buffer = new Buffer(process.env.BUFFER_ACCESS_TOKEN);

module.exports = {

	makeUpdateFromArticle: function (profile, article) {

		var LINK_DUMMY = '123456789012345678901234'

		var appendTextIfThereIsSpace = function (oldText, appendText, separator, appendFirst) {
			// Link: 23 char, image 24
			if (profile.service !== 'twitter' || (oldText.length + appendText.length <= 140)) {
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
		update.title = article.titles[Math.floor(Math.random() * article.titles.length)];
		update.image = article.images[Math.floor(Math.random() * article.images.length)];
		update.tags = article.tags;
		// Make text
		update.text = update.title;
		if (profile.service === 'twitter') {
			update.text = update.title + '\n' + LINK_DUMMY;
		}
		update.text = update.text + '\n';
		for (var t in update.tags) {
			if (update.tags.hasOwnProperty(t)) {
				update.text = appendTextIfThereIsSpace(update.text, '#'+update.tags[t], ' ', false);
			}
		}
		update.text = update.text.replace(LINK_DUMMY, update.url);
		update.text = update.text.replace('\n #', '\n#');
		return update;
	},

	postUpdates: function (profile, updates, callback) {
		console.log('postUpdates', profile.service, updates);

		async.each(updates, function (update, cbEach) {
			update.service = profile.service;

			buffer.createUpdate(
				{
					profile_ids: [profile.bufferId],
					text: update.text,
					media: {
						photo: update.image,
						//thumbnail: 'https://pbs.twimg.com/media/CW0xoXbWsAA81ZG.jpg:large',
						link: update.url,
						picture: update.image,
						title: update.title,
						// description: ,
					},
					now: false,
					attachment: true,
					// shorten: false,
					// top: false,
					// scheduled_at: null,
					// retweet: false,
				},
				function (errBuffer, results) {
					if (!errBuffer) {
						Update.create(update, cbEach);
					}
					else {
						cbEach();
					}
				}
			);

			//Update.create(update, cbEach);
		},
		callback)
	},

}