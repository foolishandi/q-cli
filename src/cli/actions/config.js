const fs = require('fs');
const { encode, decode } = require('ini');
const { downloadDirectory, defaultConfig } = require('../globals');

module.exports = (action, k, v) => {
	const flag = fs.existsSync(downloadDirectory);
	const obj = {};
	if (flag) {
		const content = fs.readFileSync(downloadDirectory, 'utf8');
		const c = decode(content);
		Object.assign(obj, c);
	}
	if (action === 'get') {
		console.log(obj[k] || defaultConfig[k]);
	} else if (action === 'set') {
		obj[k] = v;
		fs.writeFileSync(downloadDirectory, encode(obj));
		console.log(`${k}=${v}`);
	} else if (action === 'getVal') {
		return obj[k];
	}
};
