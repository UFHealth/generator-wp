'use strict';
const Generator = require('yeoman-generator');

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

		return this.prompt(questions, function (answers) {
			this.pluginName = answers.pluginName;
			this.authorName = answers.authorName;
			this.log(answers);
			done();
		}.bind(this));

	}

	writing() {

		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('package.json'), {
				pluginName: this.props.pluginName,
				authorName: this.authorName
			}
		);
	}
};
