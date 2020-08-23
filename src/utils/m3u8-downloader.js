import m3u8ToMp4 from 'm3u8-to-mp4';
const converter = new m3u8ToMp4();
// need ffmpeg
export default function(url, filePath) {
	converter.setInputFile(url).setOutputFile(filePath).start();
}
