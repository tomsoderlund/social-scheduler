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

	// CRUD

	list: function (req, res, next) {
		var searchQuery = {};
		// if (req.query.from) {
		// 	var currentTime = new Date();
		// 	searchQuery = { dateCreated: { "$gte": new Date(req.query.from), "$lt": currentTime } };
		// }

		Article.find(searchQuery, null, { sort: {dateCreated: -1} }, function (err, articles) {
			if (err) {
				return res.json(400, err);
			}
			else {
				return res.json(articles);
			}
		});
	},

	// Create new article
	create: function (req, res, next) {
		var newArticle = new Article(req.body);
		newArticle.save(function (err) {
			if (err) {
				return res.json(400, err);
			}
			else {
				return res.json(newArticle);
			}
		});
	},

/*

	read: function (req, res, next) {
		if (req.query.password === API_PASSWORD) {

			Thing.findById(req.params.id, function (err, thing) {
				if (err) {
					return res.json(400, err);
				}
				else {
					return res.json(thing);
				}
			});
		}
		else {
			return res.json(401, 'Unauthorized');
		}
	},

	// Update thing
	update: function (req, res, next) {
		Thing.update(
			{ _id: req.params.id },
			req.body,
			function (updateErr, numberAffected, rawResponse) {
				if (updateErr) {
					res.json(500, updateErr);
				}
				else {
					res.json(200, 'Updated thing ' + req.params.id);
				}
			}
		);
	},

	// Delete thing
	delete: function (req, res, next) {
		if (req.query.password === API_PASSWORD) {
			var searchParams;
			if (req.params.id === 'ALL') {
				searchParams = {};
			}
			else {
				searchParams = { _id: req.params.id }
			}

			Thing.remove(
				searchParams,
				function(thingErr, numberAffected, rawResponse) {
					if (thingErr) {
						res.json(500, thingErr);
					}
					else {
						res.json(200, 'Deleted ' + numberAffected + ' things');
					}
				}
			);
		}
		else {
			return res.json(401, 'Unauthorized');
		}
	}

*/

}