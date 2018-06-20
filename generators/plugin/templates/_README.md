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

## Changelog

##### 1.0
* Initial Release
