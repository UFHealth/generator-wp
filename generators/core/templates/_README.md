<%if ( '' !== unitName ) { %><%= unitName %> <% } %><%= pluginName %>
=============

<%= description %>

## Installation and Usage

In order to improve efficiency processed files such as minified JS, CSS and .pot files are not stored in this repository. To use this plugin:

1. Clone the repository
2. Change to the repository directory
3. Run ```composer install```
4. Run ```npm install```
5. Run ```grunt```
6. Map or copy the plugin folder to your WordPress plugins folder to activate like a regular plugin.

*Note: you might have to install Grunt globally first with ```npm -g install grunt```*

## Recommended Developer Workflow

1. Commit the initial plugin scaffolding to the *master* branch in a new repository
2. Branch to develop to work
3. Merge back to master and tag with the plugin version for release

##### Anatomy of the plugin scaffold

- assets - Asset files including CSS, JS, images, etc
- assets/css - Holds processed CSS files
- assets/css/scss - Holds the SCSS files for editing and processing. All your editing of CSS/SCSS files should be in this folder.
- assets/js - Holds the processed JS files
- assets/js/src - Hold the JavaScript source files to be processed. All your editing of JavaScript files should be in this folder.
- includes - All PHP functionality should go in here
- tests - Holds all PhpUnit tests

##### Anatomy of the Grunt file

The Grunt process performs the following y default

1. Runs unit tests with PhpUnit
2. Runs jshint to link all JavaScript source files (WP-enforcer checks PHP on commit)
3. Minifies all JS source files
4. Processes SASS files to un-minified CSS
5. Auto-prefixes the processed CSS files
6. Creates minified versions of the CSS files
7. Creates a .pot file with all translatable strings from PHP

By default the Gruntfile only looks at a single JS and SCSS file. If you need to add more simply modify the Gruntfile to add additional files for processing.

##### Using minified CSS and JS in your plugin

Minified JS and CSS is great in production but it can make development much harder. Fortunately Grunt helps us by building oth minified versions as well as development versions of all of our CSS and JS. To best utilize these in your plugin it is recommended to swap between using SCRIPT_DEBUG. Here's a great article to help you utilize this in your plugin: [https://pippinsplugins.com/use-script_debug-enable-non-minified-asset-files/](https://pippinsplugins.com/use-script_debug-enable-non-minified-asset-files/)

<% if (true === needsDocker) { %>
##### Developing your plugin locally

Bundled with this plugin is a Docker configuration compatible with our [Ouroboros](https://github.com/UFHealth/ouroboros) Docker hub. Here's how do get it running.

1. Clone and bring up [Ouroboros](https://github.com/UFHealth/ouroboros) using the instructions on its page
2. Run `./develop up -d` in this repo
3. Run the setup script using the following `./Docker/bin/setup`
4. Visit the site at [https://<%= textDomain %>.test]

To access the WordPress Dashboard for the development site use the username `admin` and the password `password`

###### Accessing the PHP server

Should you need to access the PHP server directly you can do so in the terminal by running ```./Docker/bin/shell```

###### Running WP-cli commands

You can run WP-cli commands directly against the system by running the *wp* script in *Docker/bin*. For example: ```./Docker/bin/wp site list``` will give you a site list.

###### Setting up Xdebug

[Xdebug](https://xdebug.org/) is available. To access you'll need to set the *XDEBUG_SESSION* cookie to *DOCKER_DEBUG* and listen for the connection in your ide (map your local files to */var/www/html/wp-content/plugins/<%= textDomain %>* in the IDE to get correct path mappings). A plugin such as [https://chrome.google.com/webstore/detail/xdebug-helper/eadndfjplgieldjbigjakmdgkmoaaaoc can make setting the cookie easy]

*Note: If you don't use the "develop" script to bring up the environment you'll need to manually setup the correct environment variable to get XDebug to work correctly*

## Accessing the Database Directly

By default the database ports aren't exposed to your host machine as doing so can cause conflicts if multiple projects are run at the same time. To access the database directly first bring down your server `./develop down`, then create `docker-compose.override.yml` and add the following to it:

```
version: '3'

services:
  mariadb:
	ports:
	  - "3306:3306"
```

Then bring up the environment again with the develop script. You can then access the database with the username `root` and the password `password` on `127.0.0.1`. Use Navicat, Sequel Pro, or any tool to import the starter database.
<% } %>
## Changelog

##### 1.0
* Initial Release
