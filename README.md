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
