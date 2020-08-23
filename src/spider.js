import Logger from './logger/logger';
// import { updateList } from './updateList';
// import { downloadItemFromWaitList } from './downloadItemFromWaitList';
// import { retryErrorFile } from './retryErrorFile';

const startURL = '';
const updateList_timeout = 1000 * 60 * 60;
const downloadItemFromWaitList_timeout = 1000 * 30;
// const retryErrorFile_timeout = 1000 * 60 * 10;
const { LoggerInfo } = Logger;

LoggerInfo('startSpider');
updateList(startURL, updateList_timeout);
downloadItemFromWaitList(downloadItemFromWaitList_timeout);
// retryErrorFile(retryErrorFile_timeout);
