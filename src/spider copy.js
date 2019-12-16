import Crawler from 'crawler';
import fs from 'fs';
import download from 'image-downloader';
import header from '../configs/myheader';

const pageCountFile = './configs/pageCount';
const logFile = './data/complate.txt';
const errorLogFile = './data/error.txt';
const noimg = './data/noimg.txt';
const imgsDir = './data/imgs/';

let page = parseInt(fs.readFileSync(pageCountFile, 'utf8'), 10);
const pageAdd = function() {
	fs.writeFileSync(pageCountFile, page + 1, {
		flag: 'w'
	});
};
const pageDone = function(url, title, time, imgsCount, path, spiderTime) {
	fs.writeFileSync(logFile, `${url},${title},${time},${imgsCount},${path},${spiderTime} \n`, {
		flag: 'a'
	});
};

const writeErrorLog = function(url, massage) {
	fs.writeFileSync(errorLogFile, `${url},${massage}\n`, { flag: 'a' });
};

const createDir = function(title) {
	const topicImgsDirPath = imgsDir + title;
	if (fs.existsSync(topicImgsDirPath) === false) {
		fs.mkdirSync(topicImgsDirPath);
		return imgsDir + title;
	}
	return false;
};

const getPageError = function(url, massage = 'getPageError') {
	writeErrorLog(url, massage);
};
const createDirError = function(url, massage = 'createDirError') {
	writeErrorLog(url, massage);
};
const getNextPage = function() {
	setTimeout(() => {
		try {
			spider.queue(`https://www.tuigirl888.net/topic/show/${page}`);
		} catch (err) {
			console.log(err);
			getNextPage();
		}
	}, 1000);
};
const saveImgs = function(imgs, dir) {
	for (let i = imgs.length - 1; i >= 0; i--) {
		let imgURL = imgs[i].attribs.src;
		let imgType = imgURL.split('.').pop();
		let imgPath = `${dir}/${i}.${imgType}`;

		download.image({ url: imgURL, dest: imgPath });
	}
};
const noImgs = function(url) {
	fs.writeFileSync(noimg, `${url}\n`, {
		flag: 'a'
	});
};

const spider = new Crawler({
	maxConnections: 10,
	headers: header,
	callback: function(error, res, done) {
		page = parseInt(fs.readFileSync(pageCountFile, 'utf8'), 10);
		if (error) {
			getNextPage();
			console.log(error);
		} else {
			const $ = res.$;
			const url = this.uri;
			let complate = true;
			try {
				const title = $('.topic-detail-heading')
					.children('h2')[0]
					.firstChild.data.replace(new RegExp(/( )/g), '', '');
				const time = $('.topic-detail-heading').children('.text-muted').children('span')[1].firstChild.data;
				const imgs = $('.content').children('img');
				const imgsCount = imgs.length;

				if (title) {
					if (imgsCount) {
						const path = createDir(title);
						if (path) {
							saveImgs(imgs, path);
							pageDone(url, title, time, imgsCount, path, new Date());
							pageAdd();
							getNextPage();
						} else {
							createDirError(url);
							complate = false;
							pageAdd();
							getNextPage();
						}
					} else {
						complate = false;
						noImgs(url);
						pageAdd();
						getNextPage();
					}
				} else {
					getPageError(url);
					pageAdd();
					complate = false;
					getNextPage();
				}
				console.log(title, ' ', page, ' ', complate);
			} catch (err) {
				complate = false;
				getPageError(url);
				pageAdd();
				getNextPage();
				console.log(url, ' ', page, ' ', complate);
				console.log(err);
			}
		}
		done();
	}
});

getNextPage();
