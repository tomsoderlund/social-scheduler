'use strict';

var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var updates = require('./updates');


var updateDateLastUpdate = function (articles, profile, callback) {
	var dateStamp = new Date();
	async.each(articles, function (article, cbEach) {
		article.usage = article.usage || {};
		article.usage[profile.service] = article.usage[profile.service] || {};
		article.usage[profile.service].dateLastUpdate = dateStamp;
		article.markModified('usage.' + profile.service);
		article.save(cbEach);
	},
	callback);
};

module.exports = {

	getSuggestions: function (profile, limit, callback) {
		console.log('getSuggestions', profile.service, limit);
		if (limit > 0) {
			var sortOptions = {};
			sortOptions['usage.' + profile.service + '.dateLastUpdate'] = -1;
			Article
				.find({})
				.sort(sortOptions)
				.limit(limit)
				.exec(function (err, articles) {
					var makeUpdateFromArticleForThisProfile = updates.makeUpdateFromArticle.bind(undefined, profile);
					var upds = _.map(articles, makeUpdateFromArticleForThisProfile);
					updateDateLastUpdate(articles, profile, function (errDate) {
						callback(errDate, profile, upds);
					});
				});
		}
		else {
			callback(null, profile, []);
		}
	},

}