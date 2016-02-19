# Ace Resources: A Search Engine

An app to search various data sources.

## Installation

1. `npm i`
2. `bower i` (if there are errors, ensure to create this directory `/public/bower_components` and provide write permissions)
3. Set environment variables while running the app. If you're using `forever` (`npm i forever -g`) to run your app, below command can be helpful:
	
	`BASEURL=http://<url> PORT=8012 DB=db_name DIIGO_API_KEY=<key> DIIGO_USERNAME=<username> DIIGO_PASSWORD=<password> NODE_ENV=production CITEULIKE_USERNAME=<username> CITEULIKE_PASSWORD=<password> forever --sourceDir <app-dir> -a -l <log-file-path> --minUptime 5000 --spinSleepTime 2000 start index.js`

## Setup

The `development.json` and `production.json` files will pick the environment variables and make them available to the app. This app also runs internal repetitive updates via a custom cron-like functionality - you can set how frequently the data is updated from various sources into elastic search, via the config parameter `crons.runEvery` (it takes minutes).

The crons will automatically run the python scripts responsible for updating from various data sources, and also pass the login credentials to those scripts from the environment.