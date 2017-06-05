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
			this.authorName  = answers.authorName;
			this.authorEmail = answers.authorEmail;
			this.authorUrl   = answers.authorUrl;

			this.pluginSlug  = noCase(answers.unitName.toLowerCase() + '-' + answers.pluginName.toLowerCase(), null, '_');
			this.textDomain  = noCase(answers.unitName.toLowerCase() + '-' + answers.pluginName.toLowerCase(), null, '-');
			this.pluginConst = noCase(answers.unitName.toUpperCase() + '_' + answers.pluginName.toUpperCase(), null, '_').toUpperCase();
			this.packageName = answers.unitName + '\\' + noCase(answers.pluginName, null, '_');

			done();
		});

	}

	writing() {

		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('package.json'), {
				textDomain: this.textDomain,
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

		this.fs.copy(
			this.templatePath('_phpcs.xml'),
			this.destinationPath('phpcs.xml')
		);

		this.fs.copyTpl(
			this.templatePath('_bootstrap.php'),
			this.destinationPath('bootstrap.php'), {
				pluginConst: this.pluginConst
			}
		);

		this.fs.copyTpl(
			this.templatePath('_index.php'),
			this.destinationPath(this.textDomain + '.php'), {
				pluginName:  this.pluginName,
				description: this.description,
				projectHome: this.projectHome,
				textDomain:  this.textDomain,
				pluginSlug:  this.pluginSlug,
				authorName:  this.authorName,
				authorUrl:   this.authorUrl,
				pluginConst: this.pluginConst,
				packageName: this.packageName
			}
		);

		this.fs.copyTpl(
			this.templatePath('_composer.json'),
			this.destinationPath('composer.json'), {
				description: this.description,
				textDomain:  this.textDomain,
				authorName:  this.authorName,
				authorUrl:   this.authorUrl,
				authorEmail: this.authorEmail
			}
		);
	}
};
