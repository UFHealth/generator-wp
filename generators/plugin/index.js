'use strict'
const Generator = require('yeoman-generator')
const noCase = require('no-case')

module.exports = class extends Generator {

  installingDependencies () {

    this.npmInstall(['grunt'], {'save-dev': true})

    if (true === this.needsJS) {
      this.npmInstall(['grunt-contrib-jshint'], {'save-dev': true})
      this.npmInstall(['grunt-contrib-uglify'], {'save-dev': true})
    }

    if (true === this.needsCSS) {
      this.npmInstall(['grunt-autoprefixer'], {'save-dev': true})
      this.npmInstall(['grunt-contrib-cssmin'], {'save-dev': true})
    }

    if (true === this.needsJS || true === this.needsCSS) {
      this.npmInstall(['grunt-contrib-clean'], {'save-dev': true})
      this.npmInstall(['grunt-contrib-watch'], {'save-dev': true})
      this.npmInstall(['grunt-sass'], {'save-dev': true})
    }

    this.npmInstall(['grunt-wp-i18n'], {'save-dev': true})
    this.npmInstall(['load-grunt-tasks'], {'save-dev': true})
    this.npmInstall(['time-grunt'], {'save-dev': true})

  }

  prompting () {

    const done = this.async()

    const questions = [
      {
        type: 'confirm',
        name: 'forUFHealth',
        message: 'Is this plugin for use on the UF Health multisite or Bridge network?',
      },
      {
        when: function (response) {
          return response.forUFHealth
        },
        type: 'input',
        name: 'unitName',
        message: 'Your unit name (use abbreviation, ie. ESE, if anything but UF Health). This will be prepended to the plugin name.',
        default: 'UF Health'
      },
      {
        type: 'input',
        name: 'pluginName',
        message: 'The Plugin Name.',
        //Defaults to the project's folder name if the input is skipped
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Plugin Description',
        default: 'My awesome WordPress plugin'
      },
      {
        type: 'input',
        name: 'repoLocation',
        message: 'GIT Repository'
      },
      {
        type: 'input',
        name: 'projectHome',
        message: 'Project homepage',
        default: 'http://webservices.ufhealth.org/'
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name',
        default: 'UF Health',
        store: true
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author email',
        default: 'webservices@ahc.ufl.edu',
        store: true
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author URL',
        default: 'http://webservices.ufhealth.org/',
        store: true
      },
      {
        type: 'confirm',
        name: 'needsDocker',
        message: 'Does this plugin need a Docker environment for development?',
      },
      {
        type: 'confirm',
        name: 'needsJS',
        message: 'Does this plugin need processing for JavaScript?',
      },
      {
        type: 'confirm',
        name: 'needsCSS',
        message: 'Does this plugin need processing for CSS/SCSS?',
      }
    ]

    this.prompt(questions, function (response) {}).then((answers) => {

      this.forUFHealth = answers.forUFHealth

      // Set a unit name if we don't otherwise have it available.
      if (false === this.forUFHealth) {
        answers.unitName = ''
      }

      this.unitName = answers.unitName
      this.pluginName = answers.pluginName
      this.description = answers.description
      this.projectHome = answers.projectHome
      this.authorName = answers.authorName
      this.authorEmail = answers.authorEmail
      this.authorUrl = answers.authorUrl
      this.repoLocation = answers.repoLocation
      this.needsDocker = answers.needsDocker
      this.needsJS = answers.needsJS
      this.needsCSS = answers.needsCSS

      let unitAbbr = answers.unitName.replace(/ /g, '')

      this.pluginSlug = noCase(unitAbbr + '-' + this.pluginName, null, '_')
      this.textDomain = noCase(unitAbbr + '-' + this.pluginName, null, '-')
      this.pluginConst = noCase(unitAbbr + '_' + this.pluginName, null, '_').toUpperCase()
      this.packageName = '\\' + this.pluginName.trim().replace(' ', '_')

      if ('' === unitAbbr) {
        this.packageName = '\\' + unitAbbr + this.packageName
      }

      done()

    })

  }

  writing () {

    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    )

    if (true === this.needsJS) {

      this.fs.copy(
        this.templatePath('_.jshintrc'),
        this.destinationPath('.jshintrc')
      )
    }

    this.fs.copy(
      this.templatePath('_.gitlab-ci.yml'),
      this.destinationPath('.gitlab-ci.yml')
    )

    this.fs.copy(
      this.templatePath('_phpunit.xml'),
      this.destinationPath('phpunit.xml')
    )

    this.fs.copy(
      this.templatePath('_phpcs.xml'),
      this.destinationPath('phpcs.xml')
    )

    this.fs.copy(
      this.templatePath('_.gitkeep'),
      this.destinationPath('includes/.gitkeep')
    )

    this.fs.copy(
      this.templatePath('_install-wp-tests.sh'),
      this.destinationPath('tests/bin/install-wp-tests.sh')
    )

    if (true === this.needsDocker) {

      this.fs.copy(
        this.templatePath('_wp'),
        this.destinationPath('Docker/bin/wp')
      )

      this.fs.copy(
        this.templatePath('_develop'),
        this.destinationPath('develop')
      )

      this.fs.copy(
        this.templatePath('_shell'),
        this.destinationPath('Docker/bin/shell')
      )

      this.fs.copyTpl(
        this.templatePath('_setup'),
        this.destinationPath('Docker/bin/setup'), {
          textDomain: this.textDomain
        }
      )

      this.fs.copyTpl(
        this.templatePath('_docker-compose.yml'),
        this.destinationPath('docker-compose.yml'), {
          textDomain: this.textDomain
        }
      )
    }

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        textDomain: this.textDomain,
        authorName: this.authorName,
        repoLocation: this.repoLocation
      }
    )

    this.fs.copyTpl(
      this.templatePath('_bootstrap.php'),
      this.destinationPath('tests/bootstrap.php'), {
        pluginConst: this.pluginConst,
        textDomain: this.textDomain,
      }
    )

    this.fs.copyTpl(
      this.templatePath('_index.php'),
      this.destinationPath(this.textDomain + '.php'), {
        unitName: this.unitName,
        pluginName: this.pluginName,
        description: this.description,
        projectHome: this.projectHome,
        textDomain: this.textDomain,
        pluginSlug: this.pluginSlug,
        authorName: this.authorName,
        authorUrl: this.authorUrl,
        pluginConst: this.pluginConst,
        packageName: this.packageName
      }
    )

    this.fs.copyTpl(
      this.templatePath('_composer.json'),
      this.destinationPath('composer.json'), {
        description: this.description,
        textDomain: this.textDomain,
        authorName: this.authorName,
        authorUrl: this.authorUrl,
        authorEmail: this.authorEmail
      }
    )

    this.fs.copyTpl(
      this.templatePath('_Gruntfile.js'),
      this.destinationPath('Gruntfile.js'), {
        textDomain: this.textDomain,
        needsCSS: this.needsCSS,
        needsJS: this.needsJS
      }
    )

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        unitName: this.unitName,
        pluginName: this.pluginName,
        description: this.description,
        needsDocker: this.needsDocker
      }
    )

    this.fs.copyTpl(
      this.templatePath('_uninstall.php'),
      this.destinationPath('uninstall.php'), {
        unitName: this.unitName,
        pluginName: this.pluginName,
        packageName: this.packageName,
        authorName: this.authorName,
        authorEmail: this.authorEmail
      }
    )

    if (true === this.needsCSS) {
      this.fs.copyTpl(
        this.templatePath('_plugin.scss'),
        this.destinationPath('assets/css/scss/' + this.textDomain + '.scss'), {
          unitName: this.unitName,
          pluginName: this.pluginName,
          projectHome: this.projectHome,
          authorName: this.authorName
        }
      )
    }

    if (true === this.needsJS) {
      this.fs.copyTpl(
        this.templatePath('_plugin.js'),
        this.destinationPath('assets/js/src/' + this.textDomain + '.js'), {
          unitName: this.unitName,
          pluginName: this.pluginName,
          projectHome: this.projectHome,
          authorName: this.authorName
        }
      )
    }

  }

  install () {
    this.spawnCommandSync('composer', ['require', 'phpunit/phpunit:6.5.*', '--dev'])
    this.spawnCommandSync('composer', ['require', 'wp-cli/wp-cli', '--dev'])
    this.spawnCommandSync('composer', ['require', 'stevegrunwell/wp-enforcer', '--dev'])

  }

  end () {

    this.spawnCommandSync('grunt', [])
    this.spawnCommandSync('git', ['init'])
    this.spawnCommandSync('./vendor/bin/wp-enforcer', [])

  }
}
