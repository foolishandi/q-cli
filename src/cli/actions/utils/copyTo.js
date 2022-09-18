const Inquirer = require('inquirer');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const MetalSmith = require('metalsmith');
const ncp = promisify(require('ncp'));
let { render } = require('consolidate').ejs;
render = promisify(render);

const copyTo = async (startPath, projectName) => {
	if (!fs.existsSync(path.join(startPath, 'conf.js'))) {
		await ncp(startPath, path.resolve(projectName));
	} else {
		await new Promise((resolve, reject) => {
			MetalSmith(__dirname)
				.source(startPath)
				.destination(path.resolve(projectName))
				.use(async (files, metal, done) => {
					const args = require(path.join(startPath, 'conf.js'));
					const obj = await Inquirer.prompt(args);
					const meta = metal.metadata();
					Object.assign(meta, obj);
					delete files['conf.js'];
					done();
				})
				.use((files, metal, done) => {
					const obj = metal.metadata();
					Reflect.ownKeys(files).forEach(async (file) => {
						if (file.includes('js') || file.includes('json')) {
							let content = files[file].contents.toString();
							if (content.includes('<%')) {
								content = await render(content, obj);
								files[file].contents = Buffer.from(content);
							}
						}
					});
					done();
				})
				.build((err) => {
					if (err) {
						reject();
					} else {
						resolve();
					}
				});
		});
	}
};
module.exports = copyTo;
