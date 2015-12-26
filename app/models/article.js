'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	url: { type: String, unique: true, required: true },
	titles: [String],
	images: [String],
	category: { type: String },
	tags: [String],
	dateCreated: { type: Date, default: Date.now },
	usage: {}, // per social profile
});

mongoose.model('Article', ArticleSchema);