const axios = require('axios');

const fetchRepoList = async (url) => {
	const { data } = await axios.get(url);
	return data;
};

const fetchTagList = async (url, repo) => {
	const { data } = await axios.get(`${url}/${repo}/tags`);
	return data;
};

module.exports = {
	fetchRepoList,
	fetchTagList,
};
