'use strict';

app.factory('Article', function ($resource) {

	var articleModel = $resource(
		'/api/articles/:id',
		{
			id: '@_id',
			//password: password,
		},
		{
			update: {
				method: 'PUT',
			},
		}
	);

	return articleModel;

});

app.controller('ArticlesCtrl', function ($scope, Article, $cookies, $timeout) {

	$scope.categories = [
		{ id: 'article', name: 'Blog article' },
		{ id: 'case study', name: 'User story' },
		{ id: 'documentation', name: 'Docs topic' },
		{ id: 'tutorial', name: 'Tutorial' },
		{ id: 'video', name: 'Video' },
		{ id: 'example', name: 'Example' },
		{ id: 'userquote', name: 'User quote' },
		{ id: 'commercial', name: 'Commercial offering' },
		{ id: 'media', name: 'Press/media' },
		{ id: 'podcast', name: 'Podcast' },
		{ id: 'tech', name: 'Tech article' },
		{ id: 'weld-site', name: 'Weld site' },
		{ id: 'external', name: 'External site' },
		{ id: 'other', name: '(other)' },
	];

	$scope.searchArticles = function (suppressFlash) {
		Article.query(
			{
				password: $scope.password,
				search: $scope.searchText,
			},
			function (articles) {
				$scope.articles = articles;
				if (!suppressFlash)
					$scope.showFlashMessage('Found ' + articles.length + ' articles.');
			},
			function (err) {
				$scope.showFlashMessage('Error: ' + err.statusText);
				console.log('Error:', err);
			}
		);
	};

	$scope.article = new Article();

	var fixArticleBeforeSave = function (article) {
		if (article.tags && article.tags.length === 1 && article.tags[0].indexOf(',') !== -1) {
			article.tags = article.tags[0].split(',');
		}
		if (article.images) {
			for (var i = article.images.length - 1; i >= 0; i--) {
				if (article.images[i] === '')
					article.images.splice(i, 1);
			}
		}
		if (article.titles) {
			for (var t = article.titles.length - 1; t >= 0; t--) {
				if (article.titles[t] === '')
					article.titles.splice(t, 1);
			}
		}
		return article;
	};

	$scope.createArticle = function () {
		$scope.article = fixArticleBeforeSave($scope.article);
		Article.save({ password: $scope.password }, $scope.article,
			function (createdArticle) {
				$scope.showFlashMessage('Created new article “' + createdArticle.url + '”.');
				$scope.article = new Article();
			},
			function (err) {
				$scope.showFlashMessage('Error: ' + err.statusText + ' - duplicate?');
				console.log('Error:', err);
			}
		)
	};

	$scope.updateArticle = function (article) {
		article = fixArticleBeforeSave(article);
		Article.update({ password: $scope.password }, article,
			function (updatedArticle) {
				$scope.showFlashMessage('Article “' + article.url + '” updated.');
			},
			function (err) {
				$scope.showFlashMessage('Error: ' + err.statusText);
				console.log('Error:', err);
			}
		);
	};

	$scope.deleteArticle = function (article) {
		if (confirm('Are you sure you want to delete “' + article.url + '”?')) {
			Article.delete({ password: $scope.password }, article,
				function (updatedArticle) {
					$scope.showFlashMessage('Article “' + article.url + '” deleted.');
					$scope.searchArticles(true);
				},
				function (err) {
					$scope.showFlashMessage('Error: ' + err.statusText);
					console.log('Error:', err);
				}
			);
		}
	};

	$scope.clearUsage = function (article) {
		if (confirm('Clear usage data for “' + article.url + '”?')) {
			article.usage = null;
		}
	};

	$scope.addArrayItem = function (article, arrayName) {
		article[arrayName] = article[arrayName] || [];
		article[arrayName].push('');
	};

	$scope.setPassword = function (pw) {
		$cookies.put('sssPassword', pw, { expires: new Date((new Date()).getTime() + 365*24*60*60*1000) });
		$scope.showFlashMessage('Server password set.');
	};

	$scope.getTextWarning = function (textStr) {
		if (textStr && textStr.length > 116)
			return 'red';
		else if (textStr && textStr.length > 100)
			return 'yellow';
		else
			return 'green';
	};

	$scope.showFlashMessage = function (textStr, category) {
		$scope.flashMessage = textStr;
		$timeout(function () {
			$scope.flashMessage = null;
		}, 5000);
	};

	$scope.password = $cookies.get('sssPassword');
	if ($scope.password) {
		//getArticleList();
	}

});
