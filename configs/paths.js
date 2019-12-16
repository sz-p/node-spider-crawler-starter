const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
export default {
	errorFile_CSV: resolveApp('./logs/error.csv'),
	successFile_CSV: resolveApp('./logs/success.csv'),
	header: resolveApp('./configs/header.js')
};
