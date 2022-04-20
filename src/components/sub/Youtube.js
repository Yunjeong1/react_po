import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Popup from '../common/Popup';

function Youtube() {
	const pop = useRef(null);
	const key = 'AIzaSyB81cXmxoWdzbYs8QZUlN_LQskZFT_Xqoo';
	const num = 5;
	const id = 'PLMaY0ixOiyljR7EsFnCk9HPiR7eNsI6Yd';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${id}`;

	const [items, setItems] = useState([]);
	const [index, setIndex] = useState(0);
	//데이터 로딩에 관련한 state추가
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		axios.get(url).then((json) => {
			console.log(json.data.items);
			setItems(json.data.items);
			//모든 데이터가 호출되고 state값에 담기면 loding state값 true로 변경
			setLoading(true);
		});
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				{items.map((item, idx) => {
					const desc = item.snippet.description;
					const date = item.snippet.publishedAt;

					return (
						<article
							key={idx}
							onClick={() => {
								setIndex(idx);
								//자식컴포넌트에서 리턴하고있는 open함수를 호출해서 팝업 출력
								pop.current.open();
							}}>
							<img src={item.snippet.thumbnails.medium.url} />
							<h2>{item.snippet.title}</h2>
							<p>{desc.length > 150 ? desc.substr(0, 150) + '...' : desc}</p>
							<span>{date.split('T')[0]}</span>
						</article>
					);
				})}
			</Layout>

			{/* forwardRef로 내보내진 컴포넌트를 활용하기 위해서는 부모컴포넌트에서 useRef로 참조 */}
			<Popup ref={pop}>
				{/*loading이 true일떄 팝업안에 유튜브 데이터 출력*/}
				{loading && (
					<iframe
						src={
							'https://www.youtube.com/embed/' +
							items[index].snippet.resourceId.videoId
						}
						frameBorder='0'></iframe>
				)}
				{/* pop.current(자식인 Popup컴포넌트가 리턴하는 open, close를 품고있는 객체) */}
				<span onClick={() => pop.current.close()}>close</span>
			</Popup>
		</>
	);
}

export default Youtube;
