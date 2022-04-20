import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Popup from '../common/Popup';

function Gallery() {
	const [items, setItems] = useState([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const base = 'https://www.flickr.com/services/rest/?';
		const method_people = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const username = '195294341@N02';
		const key = '24d03e5e0bfb87d434ce0c70071a6ff9';
		const per_page = 25;
		const url = `${base}method=${method_people}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}`;

		axios.get(url).then((json) => {
			console.log(json.data);
			setItems(json.data.photos.photo);
		});
	}, []);

	return (
		<>
			<Layout name={'Gallery'}>
				{items.map((item, idx) => {
					return (
						<div className='wrap' key={idx}>
							<article
								onClick={() => {
									setIndex(idx);
								}}>
								<div className='inner'>
									<div className='pic'>
										<img
											src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
										/>
									</div>
									<div className='text'>
										<p>{item.title}</p>
										<span>by {item.owner}</span>
									</div>
								</div>
							</article>
						</div>
					);
				})}
			</Layout>
		</>
	);
}

export default Gallery;
