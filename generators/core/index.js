'use strict'
const Generator = require('yeoman-generator')
const noCase = require('no-case')

module.exports = class extends Generator {

  prompting () {

    const done = this.async()

    const questions = [
      {
        type: 'confirm',
        name: 'multisite',
        message: 'Do you need WordPress Multisite?',
      }
    ]

    this.prompt(questions, function (response) {}).then((answers) => {

      this.multisite = answers.multisite

      done()

    })

  }

  writing () {

    if (true === this.multisite) {

      this.fs.copy(
        this.templatePath('_.htaccess-multisite'),
        this.destinationPath('Docker/wordpress/.htaccess')
      )

    } else {

      this.fs.copy(
        this.templatePath('_.htaccess'),
        this.destinationPath('Docker/wordpress/.htaccess')
      )

    }

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
      this.templatePath('_docker-compose.yml'),
      this.destinationPath('docker-compose.yml'), {
        multisite: this.multisite
      }
    )

    this.fs.copyTpl(
      this.templatePath('_setup'),
      this.destinationPath('Docker/bin/setup'), {
        multisite: this.multisite
      }
    )

  }
}
