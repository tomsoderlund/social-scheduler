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

app.controller('ArticlesCtrl', function ($scope, Article, $cookies) {

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

	$scope.searchArticles = function () {
		Article.query(
			{
				password: $scope.password,
				search: $scope.searchText,
			},
			function (articles) {
				$scope.articles = articles;
			},
			function (error) {
				console.log('error', error);
			}
		);
	};

	$scope.article = new Article();

	$scope.createArticle = function () {
		Article.save({ password: $scope.password }, $scope.article, function (res) {
			console.log('Saved', res);
			$scope.article = new Article();
		})
	};

	$scope.updateArticle = function (article) {
		Article.update({ password: $scope.password }, article, function (res) {
			console.log('Updated', res);
		}, function (err) {
			console.log('Err', err);
		});
	};

	$scope.addArrayItem = function (array) {
		array.push('');
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

	$scope.password = $cookies.get('sssPassword');
	if ($scope.password) {
		//getArticleList();
	}

});