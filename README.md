UF Health WordPress Project Generator
=================

Generator-wp is a [Yeoman](http://yeoman.io) generator for generating a base WordPress plugin (with themes to come) for use on UF Health WordPress properties based, in part, on [generator-wp-make by 10up](https://github.com/10up/generator-wp-make).

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

generator-wp currently ships with one default project type, it is invoked with a subgenerator.

For each project type you get:

- Composer to manage server-side dependencies
- NPM to manage development dependencies (like Grunt)
- Grunt to streamline development
- phpunit and [WP_Mock](https://github.com/10up/wp_mock) for PHP unit testing
- A fully-fleshed out, namespaced setup for WordPress plugin development

### Plugin

This subgenerator scaffolds out a standard WordPress plugin.

The project even includes some basic unit test examples to help get you started!

```
$ cs [my-plugin-dir]
$ yo wp:plugin
```

For information on developing and using a generated plugin see the README.md file within after generating.

**More project types coming soon**

## Changelog

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
