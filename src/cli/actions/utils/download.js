const { promisify } = require('util');
const downloadGitRepo = promisify(require('download-git-repo'));
const { downloadDirectory, defaultConfig } = require('../../globals');

const download = async (repo, tag) => {
	let api = `${defaultConfig.user}/${repo}`;
	if (tag) api += `#${tag}`;
	const dest = `${downloadDirectory}/${repo}`;
	// console.log(api, dest);
	await downloadGitRepo(api, dest);
	return dest;
};
module.exports = download;
