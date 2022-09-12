const fs = require('fs');
const directory = (absolutePath) => {
	let routes = [];
	const files = fs.readdirSync(absolutePath);
	files.forEach((item) => {
		if (item.includes('.')) return;
		routes.push(item);
	});
	return routes;
};

const pathCheck = (path) => {
	if (fs.existsSync(path)) {
		return true;
	}
	return false;
};
module.exports = { directory, pathCheck };
