// 找到要执行的核心文件
// 要解析用户的参数
const program = require('commander');
const path = require('path');
const { version } = require('./globals');

// 命令模板
const mapActions = {
	init: {
		alias: 'i',
		description: '初始化本地项目',
		examples: ['q-cli init <project-name>'],
	},
	fetch: {
		alias: 'f',
		description: '初始化远程项目',
		examples: ['q-cli fetch <project-name>'],
	},
	config: {
		alias: 'conf',
		description: 'config project variable',
		examples: ['q-cli config set <k> <v>', 'q-cli config get <k>', 'q-cli config getVal <k>'],
	},
	'*': {
		alias: '',
		description: '未知命令',
		examples: [],
	},
};
// 命令行操作
Reflect.ownKeys(mapActions).forEach((action) => {
	program
		.command(action)
		.alias(mapActions[action].alias)
		.description(mapActions[action].description)
		.action(() => {
			if (action === '*') {
				console.log(mapActions[action].description);
			} else {
				require(path.resolve(__dirname + '/actions', action))(...process.argv.slice(3));
			}
		});
});
// 监听用户的help 事件
program.on('--help', () => {
	console.log('\nExamples:');
	Reflect.ownKeys(mapActions).forEach((action) => {
		mapActions[action].examples.forEach((example) => {
			console.log(`${example}`);
		});
	});
});

// 解析用户传递过来的参数
program.version(version).parse(process.argv);
