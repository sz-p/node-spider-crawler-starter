import paths from './paths';
export default {
	useHeader: false,
	logToDataBase: {
		enable: false,
		useMysql: false,
		mysqlConfig: {
			host: '',
			user: '',
			password: '',
			database: ''
		}
	},
	logToFile: {
		enable: true,
		useCsv: true,
		scvConfig: {
			errorFile: paths.errorFile_CSV,
			successFile: paths.successFile_CSV
		}
	},
	logToConsole: {
		enable: true
	}
};
