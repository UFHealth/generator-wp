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

#### 1.0.2
* Add unit to plugin display name for easier sorting in WordPress dashboard

#### 1.0.1
* Replace Travis template with GitLab CI template
* Fix: Make sure source assets are not caught up in .gitignore.

#### 1.0
* Initial release
