/**
 * Application routes for REST
 */

'use strict';

var express = require('express');

module.exports = function (app, config) {

	var router = express.Router();
	app.use('/', router);

	// Controllers
	var startController = require(config.root + '/app/controllers/start');
	var authController = require(config.root + '/app/controllers/auth');
	var articlesController = require(config.root + '/app/controllers/articles');

	router.get('/api/articles', authController.isAuthenticated, articlesController.list);
	router.get('/api/articles/:id', authController.isAuthenticated, articlesController.read);
	router.post('/api/articles', authController.isAuthenticated, articlesController.create);
	router.put('/api/articles/:id', authController.isAuthenticated, articlesController.update);
	router.delete('/api/articles/:id', authController.isAuthenticated, articlesController.delete);

	router.get('/', startController.index);

};