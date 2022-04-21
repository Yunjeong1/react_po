import Layout from '../common/Layout';
import { useState, useRef } from 'react';
//store에 있는 데이터를 가져오기 위한 useSelector import
import { useSelector } from 'react-redux';
import Popup from '../common/Popup';

function Youtube() {
	//해당 컴포넌트 함수 호출시 store로부터 youtube데이터를 useSelector로 가져옴
	//store에서 youtubeReducer데이터 가져옴(빈배열)
	const vidData = useSelector((state) => state.youtubeReducer.youtube);
	const pop = useRef(null);
	const [index, setIndex] = useState(0);

	return (
		<>
			<Layout name={'Youtube'}>
				{/* reducer를 통해 store로부터 전달받은 vidData로 리스트 출력 */}
				{vidData.map((item, idx) => {
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
				{/* 해당 vidData값이 있을때 팝업안에 데이터 출력 */}
				{vidData.length !== 0 && (
					<iframe
						src={
							'https://www.youtube.com/embed/' +
							vidData[index].snippet.resourceId.videoId
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
