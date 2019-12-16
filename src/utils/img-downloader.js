import download from 'image-downloader';
export default function(imgURL, imgPath) {
	download.image({ url: imgURL, dest: imgPath });
}
