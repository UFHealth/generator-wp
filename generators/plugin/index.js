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
				message: 'The Plugin Name. Do not include UF Health or other unit name in the beginning.',
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
				name:    'repoLocation',
				message: 'GIT Repository'
			},
			{
				type:    'input',
				name:    'projectHome',
				message: 'Project homepage',
				default: 'http://webservices.ufhealth.org/'
			},
			{
				type:    'input',
				name:    'unitName',
				message: 'Your unit name (use abbreviation, ie. ESE, if anything but UF Health). This will be prepended to the plugin name.',
				default: 'UF Health'
			},
			{
				type:    'input',
				name:    'authorName',
				message: 'Author name',
				default: 'UF Health'
			},
			{
				type:    'input',
				name:    'authorEmail',
				message: 'Author email',
				default: 'webservices@ahc.ufl.edu'
			},
			{
				type:    'input',
				name:    'authorUrl',
				message: 'Author URL',
				default: 'http://webservices.ufhealth.org/'
			}
		];

		this.prompt(questions).then((answers) => {

			this.pluginName  = answers.unitName + ' ' + answers.pluginName;
			this.description = answers.description;
			this.projectHome = answers.projectHome;
			this.authorName  = answers.authorName;
			this.authorEmail = answers.authorEmail;
			this.authorUrl   = answers.authorUrl;

			let unitAbbr = answers.unitName.replace(/ /g, '');

			this.pluginSlug  = noCase(unitAbbr + '-' + answers.pluginName, null, '_');
			this.textDomain  = noCase(unitAbbr + '-' + answers.pluginName, null, '-');
			this.pluginConst = noCase(unitAbbr + '_' + answers.pluginName, null, '_').toUpperCase();
			this.packageName = unitAbbr + '\\' + answers.pluginName.trim().replace(' ', '_');

			done();
			
		})

	}

	writing() {

		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('package.json'), {
				textDomain:   this.textDomain,
				authorName:   this.authorName,
				repoLocation: this.authorName
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
			this.templatePath('_.gitlab-ci.yml'),
			this.destinationPath('.gitlab-ci.yml')
		);

		this.fs.copy(
			this.templatePath('_phpunit.xml'),
			this.destinationPath('phpunit.xml')
		);

		this.fs.copy(
			this.templatePath('_phpcs.xml'),
			this.destinationPath('phpcs.xml')
		);

		this.fs.copy(
			this.templatePath('_.gitkeep'),
			this.destinationPath('includes/.gitkeep')
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

		this.fs.copyTpl(
			this.templatePath('_Gruntfile.js'),
			this.destinationPath('Gruntfile.js'), {
				textDomain: this.textDomain
			}
		);

		this.fs.copyTpl(
			this.templatePath('_README.md'),
			this.destinationPath('README.md'), {
				pluginName:  this.pluginName,
				description: this.description
			}
		);

		this.fs.copyTpl(
			this.templatePath('_uninstall.php'),
			this.destinationPath('uninstall.php'), {
				pluginName:  this.pluginName,
				packageName: this.packageName,
				authorName:  this.authorName,
				authorEmail: this.authorEmail
			}
		);

		this.fs.copyTpl(
			this.templatePath('_TestCase.php'),
			this.destinationPath('tests/phpunit/test-tools/TestCase.php'), {
				packageName: this.packageName
			}
		);

		this.fs.copyTpl(
			this.templatePath('_plugin.scss'),
			this.destinationPath('assets/css/scss/' + this.textDomain + '.scss'), {
				pluginName:  this.pluginName,
				projectHome: this.projectHome,
				authorName:  this.authorName
			}
		);

		this.fs.copyTpl(
			this.templatePath('_plugin.js'),
			this.destinationPath('assets/js/src/' + this.textDomain + '.js'), {
				pluginName:  this.pluginName,
				projectHome: this.projectHome,
				authorName:  this.authorName
			}
		);

	}
};
