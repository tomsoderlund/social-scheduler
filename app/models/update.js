'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UpdateSchema = new Schema({
	service: { type: String },
	articleId: { type: Schema.Types.ObjectId, ref: 'Article' },
	dateCreated: { type: Date, default: Date.now },
	slug: { type: String, unique: false },
	title: { type: String },
	image: { type: String },
	category: { type: String },
	tags: [String],
});

mongoose.model('Update', UpdateSchema);