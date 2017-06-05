'use strict';
const path      = require('path');
const Generator = require('yeoman-generator');
const superb    = require('superb');

module.exports = class extends Generator {

	prompting() {

		let done = this.async();

		this.prompt({
			            type:    'input',
			            name:    'name',
			            message: 'Your project name',
			            //Defaults to the project's folder name if the input is skipped
			            default: this.appname
		            }, function (answers) {
			this.props = answers;
			this.log(answers.name);
			done();
		}.bind(this));

	}

	writing() {

		const generatorName = this.fs.readJSON(this.destinationPath('package.json')).name;

		this.fs.copyTpl(
			this.templatePath('index.js'),

			this.destinationPath(path.join('generators', this.options.name, 'index.js')),
			{
				// Escape apostrophes from superb to not conflict with JS strings
				superb: superb().replace('\'', '\\\''),
				generatorName
			}
		);

		this.fs.copy(
			this.templatePath('templates/**'),
			this.destinationPath(path.join('generators', this.options.name, 'templates'))
		);

		this.fs.copyTpl(
			this.templatePath('test.js'),
			this.destinationPath('__tests__/' + this.options.name + '.js'),
			{
				name: this.options.name,
				generatorName
			}
		);
	}
};
