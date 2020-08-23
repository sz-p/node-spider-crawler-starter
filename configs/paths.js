const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
export default {
	errorFile_CSV: resolveApp('./downloadData/logs/error.csv'),
	successFile_CSV: resolveApp('./downloadData/logs/success.csv'),
	infoFile_CSV: resolveApp('./downloadData/logs/info.csv'),

	header: resolveApp('./configs/header.js'),

	downloaded: resolveApp('./downloadData/downloaded'),
	waitList: resolveApp('./downloadData/waitList'),
	errorList: resolveApp('./downloadData/errorList'),

	downloadDataDir: resolveApp('./downloadData')
};
