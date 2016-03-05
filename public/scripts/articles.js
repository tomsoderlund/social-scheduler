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
		{ id: 'podcast', name: 'Podcast' },
		{ id: 'tech', name: 'Tech article' },
		{ id: 'weld-site', name: 'Weld site' },
		{ id: 'external', name: 'External site' },
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
			function (error) {
				console.log('error', error);
			}
		);
	};

	$scope.article = new Article();

	$scope.createArticle = function () {
		Article.save({ password: $scope.password }, $scope.article,
			function (createdArticle) {
				$scope.showFlashMessage('Created new article “' + createdArticle.url + '”.');
				$scope.article = new Article();
			},
			function (err) {
				console.log('Error:', err);
			}
		)
	};

	$scope.updateArticle = function (article) {
		Article.update({ password: $scope.password }, article,
			function (updatedArticle) {
				$scope.showFlashMessage('Article “' + article.url + '” updated.');
			},
			function (err) {
				console.log('Error:', err);
			}
		);
	};

	$scope.deleteArticle = function (article) {
		Article.delete({ password: $scope.password }, article,
			function (updatedArticle) {
				$scope.showFlashMessage('Article “' + article.url + '” deleted.');
				$scope.searchArticles(true);
			},
			function (err) {
				console.log('Error:', err);
			}
		);
	};

	$scope.addArrayItem = function (article, arrayName) {
		article[arrayName] = article[arrayName] || [];
		article[arrayName].push('');
	};

	$scope.setPassword = function (pw) {
		$cookies.put('sssPassword', pw);
		$scope.searchArticles();
	};

	$scope.getTextWarning = function (textStr) {
		if (textStr.length > 116)
			return 'red';
		else if (textStr.length > 100)
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