'use strict';
const path      = require('path');
const Generator = require('yeoman-generator');
const superb    = require('superb');

module.exports = class extends Generator {

	prompting() {

		let done = this.async();

		let questions = [
			{
				type:    'input',
				name:    'pluginName',
				message: 'The Plugin Name',
				//Defaults to the project's folder name if the input is skipped
				default: this.appname
			},
			{
				type:    'input',
				name:    'description',
				message: 'Description',
				default: 'My awesome WordPress plugin'
			},
			{
				name:    'projectHome',
				message: 'Project homepage',
				default: 'https://ufhealth.org/'
			},
			{
				type:    'input',
				name:    'unitName',
				message: 'Your unit abbreviation',
				default: 'ufhealth'
			},
			{
				name:    'authorName',
				message: 'Author name',
				default: this.user.git.name
			},
			{
				name:    'authorEmail',
				message: 'Author email',
				default: this.user.git.email
			},
			{
				name:    'authorUrl',
				message: 'Author URL',
				default: 'https://ufhealth.org/'
			}
		];

		this.prompt(questions, function (answers) {
			this.props = answers;
			this.log(answers.pluginName);
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