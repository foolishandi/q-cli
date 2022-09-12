// 存放用户的所需要的常量
const path = require('path');
const { version } = require('../../package.json');

// 存储模板的位置
const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/template`;
// 本地模板路径
const localTemplatePath = path.resolve(__dirname.split('src')[0], 'src', 'template');

const defaultConfig = {
	repo: 'q-cli', // 默认拉取的仓库名
	user: 'foolishandi',
};

module.exports = {
	version,
	downloadDirectory,
	localTemplatePath,
	defaultConfig,
};
