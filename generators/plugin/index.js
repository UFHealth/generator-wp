'use strict';
const Generator = require('yeoman-generator');
const noCase    = require('no-case');

module.exports = class extends Generator {

	prompting() {

		const done = this.async();

		const questions = [
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
				type:    'input',
				name:    'projectHome',
				message: 'Project homepage',
				default: 'https://ufhealth.org/'
			},
			{
				type:    'input',
				name:    'unitName',
				message: 'Your unit abbreviation',
				default: 'UFHealth'
			},
			{
				type:    'input',
				name:    'authorName',
				message: 'Author name',
				default: this.user.git.name
			},
			{
				type:    'input',
				name:    'authorEmail',
				message: 'Author email',
				default: this.user.git.email
			},
			{
				type:    'input',
				name:    'authorUrl',
				message: 'Author URL',
				default: 'https://ufhealth.org/'
			}
		];

		this.prompt(questions).then((answers) => {
			this.pluginName  = answers.pluginName;
			this.description = answers.description;
			this.projectHome = answers.projectHome;
			this.unitName    = answers.unitName;
			this.authorName  = answers.authorName;
			this.authorEmail = answers.authorEmail;
			this.authorUrl   = answers.authorUrl;

			this.pluginSlug = noCase(this.unitName + '-' + this.pluginName, null, '-').toLowerCase();
			this.pluginConst = noCase(this.unitName + '-' + this.pluginName, null, '_').toUpperCase();
			this.pluginSlug.toLowerCase();

			done();
		});

	}

	writing() {

		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('package.json'), {
				pluginSlug: this.pluginSlug,
				authorName: this.authorName
			}
		);

		this.fs.copy(
			this.templatePath('_.gitignore'),
			this.destinationPath('.gitignore')
		);

		this.fs.copy(
			this.templatePath('_.jshintrc'),
			this.destinationPath('.jshintrc')
		);

		this.fs.copy(
			this.templatePath('_.travis.yml'),
			this.destinationPath('.travis.yml')
		);

		this.fs.copyTpl(
			this.templatePath('_bootstrap.php'),
			this.destinationPath('bootstrap.php'), {
				pluginConst: this.pluginConst
			}
		);
	}
};
