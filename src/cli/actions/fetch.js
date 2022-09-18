const download = require('./utils/download');
const url = require('../api');
const waitFnloading = require('./utils/waitFnloading');
const { fetchRepoList, fetchTagList } = require('./utils/fetchList');
const command = require('./utils/command');
const copyTo = require('./utils/copyTo');

module.exports = async (projectName = 'myApp') => {
	let repos = await waitFnloading(fetchRepoList, '获取模板中···')(url.reposUrl);
	repos = repos.map((item) => item.name);
	const repo = await command('list', { msg: '请选择一个模板:', list: repos });
	let tags = await waitFnloading(fetchTagList, '获取模板版本中···')(url.tagsUrl, repo);
	tags = tags.map((item) => item.name);
	const tag = await command('list', { msg: '请选择一个版本:', list: tags });
	const result = await waitFnloading(download, `${repo}/${tag}下载中···`)(repo, tag);
	copyTo(result, projectName);
};
