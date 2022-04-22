import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';

function Vids(props) {
	//App컴포넌트 함수가 실행이 되자마자 store의 빈 reducer데이터를 가져옴
	const vidData = useSelector((state) => state.youtubeReducer.youtube);
	const pop = useRef(null);
	const [index, setIndex] = useState(0);

	//현재 스크롤되고 있는 거리값
	const scrolled = props.scrolled;
	//해당 섹션의 세로 위치값
	const start = props.posStart;
	//스크롤 위치 보정값
	//(양수: 기준점을 위로 끌어올림, 음수: 기준점을 아래로 내림)
	const base = 300;
	//보정값을 적용한 스크롤 거리값
	const position = scrolled - start + base;

	return (
		<>
			<section id='vids' className='myScroll'>
				<h2
					style={
						position >= 0 ? { transform: `translateX(${position}px)` } : null
					}>
					정속 이동
				</h2>
				<h2
					style={
						position >= 0
							? { transform: `translateX(${position * 2}px)` }
							: null
					}>
					2배 빠르게 이동
				</h2>
				<h2
					style={
						position >= 0
							? { transform: `translateX(${position / 2}px)` }
							: null
					}>
					2배 느리게 이동
				</h2>
				<ul className='vidList'>
					{vidData.map((vid, idx) => {
						if (idx < 3)
							return (
								<li
									key={idx}
									onClick={() => {
										setIndex(idx);
										pop.current.open();
									}}>
									<img src={vid.snippet.thumbnails.medium.url} />
								</li>
							);
					})}
				</ul>
			</section>

			<Popup ref={pop}>
				{vidData.length !== 0 && (
					<iframe
						src={
							'https://www.youtube.com/embed/' +
							vidData[index].snippet.resourceId.videoId
						}
						frameBorder='0'></iframe>
				)}
				<span onClick={() => pop.current.close()}>close</span>
			</Popup>
		</>
	);
}

export default Vids;
