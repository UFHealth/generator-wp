let Base  = require('extendable-yeoman').Base;
let chalk = require('chalk');

module.exports = Base.extend(
	{
		notify: function () {
			// replace it with a short and sweet description of your generator
			this.log(chalk.magenta('Invoke a subgenerator to get started!'));
			this.log('Available Modules:');
			this.log(chalk.green('\tyo wp:plugin'));
			this.log(chalk.green('\tyo wp:core'));
		}
	}
);
