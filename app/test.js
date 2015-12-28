#!/usr/bin/env node

'use strict';

var init = require('./init');

var profiles = require('./controllers/profiles');
var articles = require('./controllers/articles');
var updates = require('./controllers/updates');


console.log('Test');

var testProfile = {
	"bufferId": "5317236f168f20f9210000f5",
	"service": "twitter"
	// "bufferId": "52f669165f83d92355000037",
	// "service": "facebook"
};

var testArticle = {
	"_id": "123",
	"url": "https://s3-eu-west-1.amazonaws.com/weld-social-and-blog/video-loops/Font+searching.mov",
	"titles": [
		"This is a test post 2"
	],
	"category": "article",
	"randomOrder": 252,
	"dateCreated": new Date(1451221811326),
	"tags": [
		"testtag"
	],
	"images": [
		"https://cdn-images-1.medium.com/max/1024/1*BgCJGJryezoqN0M9_ynj8w.png"
	],
}

var testUpdate = updates.makeUpdateFromArticle(testProfile, testArticle);

console.log('Update:', testUpdate);

//updates.scheduleUpdates(testProfile, [testUpdate], init.closeDatabase);
updates.getPendingUpdates(testProfile, init.closeDatabase);

//init.closeDatabase();