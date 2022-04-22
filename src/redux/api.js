import axios from 'axios';
const path = process.env.PUBLIC_URL;

export const getMember = async () => {
	const url = path + '/DB/' + 'member.json';

	return await axios.get(url);
};

export const getFlickr = async (opt) => {
	const key = '24d03e5e0bfb87d434ce0c70071a6ff9';
	const method1 = 'flickr.interestingness.getList';
	const method2 = 'flickr.photos.search';
	const num = 50;
	let url = '';

	if (opt.type === 'interest') {
		url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
	}
	if (opt.type === 'search') {
		url = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
	}

	return await axios.get(url);
};

//dispatch로 전달할 데이터를 비동기로 가져오기 위한 axios함수 정의
export const getYoutube = async () => {
	const key = 'AIzaSyB81cXmxoWdzbYs8QZUlN_LQskZFT_Xqoo';
	const num = 5;
	const id = 'PLMaY0ixOiyljR7EsFnCk9HPiR7eNsI6Yd';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${id}`;

	//axios로 비동기 데이터 가져옴
	return await axios.get(url);
};
