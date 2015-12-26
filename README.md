# Smart Social Scheduler

Posts links to Buffer, analyses clicks, and improves itself.

## Usage

...

## How to Run

Just start with:

	# Set password used in API requests
	export SSS_PASSWORD=MYPASSWORD
	export BUFFER_ACCESS_TOKEN=[token]

	grunt

Server will default to **http://localhost:3009**


## API

List articles

	curl http://localhost:3009/api/articles?password=MYPASSWORD

Create new article:

	curl -X POST -H "Content-Type: application/json" -d '{ ... }' http://localhost:3009/api/articles?password=MYPASSWORD

Update article:

	curl -X PUT -H "Content-Type: application/json" -d '{ ... }' http://localhost:3009/api/articles/548cbb2b1ad50708212193d8?password=MYPASSWORD

Delete article:

	curl -X DELETE http://localhost:3009/api/articles/5477a6f88906b9fc766c843e?password=MYPASSWORD

Delete all articles:

	curl -X DELETE http://localhost:3009/api/articles/ALL?password=MYPASSWORD


## Implementation

Based on the [Yeoman Express generator](https://github.com/petecoop/generator-express) with the "MVC" option.
Built on Node.js, Express (with EJS) and MongoDB.

## Deploying on Heroku

	# Set up and configure app
	heroku create MYAPPNAME
	heroku addons:add mongolab
	heroku config:set NODE_ENV=production

	# Set password used in API requests
	heroku config:set SSS_PASSWORD=MYPASSWORD
