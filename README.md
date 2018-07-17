UF Health WordPress Project Generator
=================

Generator-wp is a [Yeoman](http://yeoman.io) generator for generating a base WordPress plugin (with themes to come) or a test environment for WordPress itself for use on UF Health WordPress properties based, in part, on [generator-wp-make by 10up](https://github.com/10up/generator-wp-make).

## Installation

If you need it, install Yeoman through npm:

```
$ npm install -g yo
```

To install generator-wp clone this repository, enter the directory, and link it to npm:

```
$ git clone git@gitlab.ahc.ufl.edu:WebServices/generator-wp.git && cd generator-wp
$ npm install
$ npm link
```

Finally, in the desired project directory (where your plugin or theme will go), initiate the generator:

```
$ yo wp
```

## Usage

generator-wp currently ships with te default project type, it is invoked with a subgenerator.

For each project type you get:

- Composer to manage server-side dependencies
- NPM to manage development dependencies (like Grunt)
- Grunt to streamline JS and CSS assets
- phpunit for PHP unit testing
- A fully-fleshed out, name-spaced setup for WordPress plugin development
- A Docker configuration, compatible with [Ouroboros](https://github.com/UFHealth/ouroboros), to get you actually working on code quickly.

### Plugin

This subgenerator scaffolds out a standard WordPress plugin.

The project even includes some basic unit test examples to help get you started!

```
$ cd [my-plugin-dir]
$ yo wp:plugin
```

For information on developing and using a generated plugin see the README.md file within after generating.

### Core

This subgenerator sets up a quick WordPress environment for testing or other use.

```
$ cd [the directory where you want to install WordPress]
$ yo wp:core
```

After installation is complete bring up the local environment in Docker with the Develop script and run `./Docker/bin/setup`. WordPress will then be accessible at http://wordpress.test

**More project types coming soon**

## Changelog

##### 2.1
* Add scripts to enable and disable full-time listening for XDebug
* Updated export to work in Linux as well as Mac

##### 2.0.2
* Fix .htaccess for multisite with a new apache image

##### 2.0.1
* Make sure WordPress' rewrite rules are in place

##### 2.0
* Added the wp:core command to install a quick test environment.

##### 1.4
* Allow plugin setup without CSS or JS support
* Add Ouroboros-compatible Docker configuration to setup
* Allow UF Health prefix to be optional on setup
* Better handle plugin name, slug and other variables throughout the templates

##### 1.3.4
* Add code coverage information

##### 1.3.3
* Cleanup of existing templates
* Auto-initialize GIT repository
* Enable wp-enforcer

#### 1.3.2
* Fix wp-enforcer
* Drop WordPress VIP standards
* Minor name fixes

#### 1.3.1
* Don't use grunt/phpunt

#### 1.3
* Remove WP_Mock and use standard WordPress coding standards
* Ensure NPM packages are always up to date
* install composer an npm modules on use
* run grunt on initial setup

#### 1.2.7
* Update default packages in package.json

#### 1.2.6
* Defined the path to the includes folder in the main plugin file.

#### 1.2.5
* Updated PHPUnit to 6.5.* to address updates to wp_mock.

#### 1.2.4
* Fixed languages information in plugin index file

#### 1.2.3
* Update default URLs and author to be more inline with UF Health Webservices

#### 1.2.2
* Updated generated package.json for more current packages
* Update yeoman and related JS dependencies

#### 1.2.1
* Updated prompt descriptions for better clarity.

#### 1.2
* Add Grunt clean to plugin grunt processes
* Add dev and prod versions of compiled JS with appropriate mappings

#### 1.1.1
* Cleanup package versions in package.json
* Ignore vendor folder in .pot generation

#### 1.1
* Added Full GIT repository address to generated plugin.
* Added usage and build instructions to the readme.md file of generated plugins.

#### 1.0.2
* Add unit to plugin display name for easier sorting in WordPress dashboard

#### 1.0.1
* Replace Travis template with GitLab CI template
* Fix: Make sure source assets are not caught up in .gitignore.

#### 1.0
* Initial release
