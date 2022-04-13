import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Popup from '../common/Popup';

function Youtube() {
	const key = 'AIzaSyB81cXmxoWdzbYs8QZUlN_LQskZFT_Xqoo';
	const num = 5;
	const id = 'PLMaY0ixOiylihI8kTPQ8Ow3zwbjEcQtBr';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${id}`;

	const [items, setItems] = useState([]);

	//팝업의 생성유무를 관리하는 state 생성
	const [open, setOpen] = useState(false);

	//article 클릭시 클릭한 리스트의 순서값이 담길 state
	const [index, setIndex] = useState(0);

	useEffect(() => {
		axios.get(url).then((json) => {
			console.log(json.data.items);
			setItems(json.data.items);
		});
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				{items.map((item, idx) => {
					const desc = item.snippet.description;
					const date = item.snippet.publishedAt;

					return (
						//클릭이벤트 발생시 open값 true로 변경
						<article
							key={idx}
							onClick={() => {
								setOpen(true);
								setIndex(idx);
							}}>
							<img src={item.snippet.thumbnails.medium.url} />
							<h2>{item.snippet.title}</h2>
							<p>{desc.length > 150 ? desc.substr(0, 150) + '...' : desc}</p>
							<span>{date.split('T')[0]}</span>
						</article>
					);
				})}
			</Layout>

			{/* open state값이 true일때 팝업이 보이고 그렇지 않으면 없앰 */}
			{open ? (
				<Popup pop={setOpen}>
					<iframe
						src={
							'https://www.youtube.com/embed/' +
							items[index].snippet.resourceId.videoId
						}
						frameBorder='0'></iframe>
				</Popup>
			) : null}
		</>
	);
}

export default Youtube;
