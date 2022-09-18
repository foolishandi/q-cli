const path = require('path');
const copyTo = require('./utils/copyTo');
const command = require('./utils/command');
const { localTemplatePath } = require('../globals');
const { pathCheck, directory } = require('./utils/directory');

const init = async (projectName = 'myApp') => {
	if (pathCheck(path.resolve(process.cwd(), projectName))) {
		console.log(`当前文件夹已存在:${projectName},请重新命名项目名称:`);
		projectName = await command('input', { msg: '请重新命名项目名称:', default: 'myApp_test' });
		init(projectName);
	} else {
		const temps = await directory(localTemplatePath);
		const template = await command('list', { msg: '请选择一个模板', list: temps });
		const templatePath = path.resolve(localTemplatePath, template);
		copyTo(templatePath, projectName);
	}
};
module.exports = init;
