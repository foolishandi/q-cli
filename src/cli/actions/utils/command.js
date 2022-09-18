const Inquirer = require('inquirer');

const command = async (type, opt) => {
	const { result } = await Inquirer.prompt({
		name: 'result',
		type,
		message: opt.msg,
		choices: opt.list || '',
		default: opt.default || '',
	});
	return result;
};
module.exports = command;
