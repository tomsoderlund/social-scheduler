'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ProfileSchema = new Schema({
	bufferId: { type: String, unique: true, required: true },
	service: { type: String },
	queueSize: { type: Number }, // updates in queue
	dateCreated: { type: Date, default: Date.now },
});

mongoose.model('Profile', ProfileSchema);

/*

{
_id: '5308e22ee4c1560b72000112',
avatar: 'https://media.licdn.com/mpr/mpr/p/1/005/084/02f/1c79788.png',
avatar_https: 'https://media.licdn.com/mpr/mpr/p/1/005/084/02f/1c79788.png',
counts: { drafts: 0, pending: 0, sent: 302, daily_suggestions: 25 },
cover_photo: 'https://d3ijcis4e2ziok.cloudfront.net/default-cover-photos/blurry-blue-background-iii_facebook_timeline_cover.jpg',
default: true,
disabled_features: [],
disconnected: false,
formatted_service: 'LinkedIn Page',
formatted_username: 'Weld (www.weld.io)',
id: '5308e22ee4c1560b72000112',
schedules: [ { days: [Object], times: [Object] } ],
service: 'linkedin',
service_id: '3611005',
service_type: 'page',
service_username: 'Weld (www.weld.io)',
shortener: { domain: 'No Shortening' },
statistics: { connections: 8 },
timezone: 'Europe/Stockholm',
timezone_city: 'Stockholm - Sweden',
user_id: '52f0c7d2c0fdf44d5d000021',
utm_tracking: 'enabled',
verb: 'post'
}

*/