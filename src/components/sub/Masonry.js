import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Maconry from 'react-masonry-component';
import Popup from '../common/Popup';

function Masonry() {
	const path = process.env.PUBLIC_URL;

	//masonry옵션값 설정
	const masonryOptions = {
		transitionDuration: '0.5s', //움직일때 모션 속도
	};

	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	const [items, setItems] = useState([]);
	//로딩바 처리할 스테이트 추가
	const [loading, setLoading] = useState(true);
	const [enableClick, setEnableClick] = useState(true);
	const [ready, setReady] = useState(false);
	const [index, setIndex] = useState(0);

	//async await 구문으로 모든 flickr데이터가 로딩된후 frame에 on을 붙여서 활성화하는 함수 정의
	const getFlickr = async (opt) => {
		const key = '24d03e5e0bfb87d434ce0c70071a6ff9';
		const method1 = 'flickr.interestingness.getList';
		const method2 = 'flickr.photos.search';
		const num = opt.count;
		let url = '';

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method2}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
		}

		//axios구문으로 모든 데이터가 불러와지면
		await axios.get(url).then((json) => {
			//api호출시 해당 검색어에 대한 결과값이 없으면
			//경고창 띄우고 해당 함수 종료
			if (json.data.photos.photo.length === 0) {
				alert('해당 검색어의 이미지가 없습니다');
				return;
			}
			setItems(json.data.photos.photo);
			setReady(true);
		});
		//flickr데이터 호출이 완료된 순간, masonry가 정렬하는 시간을 벌어죽 위해서
		//1초뒤에 로딩바 사라지고 레이아웃이 위로 올라오는 모션 처리
		setTimeout(() => {
			//동기적으로 frame에 on이 붙어서 화면에 보이는 모션 처리
			frame.current.classList.add('on');
			setLoading(false);
			setTimeout(() => {
				setEnableClick(true); //frame에 on이 붙어서 올라오는 모션이 실행되는 동안 재클릭 방지
			}, 1000);
		}, 1000); //masonry UI모션이 적용되는 시간동안 지연
	};

	const showSearch = (e) => {
		//검색어 좌우로 빈칸 제거
		const result = input.current.value.trim();
		//입력된 결과값이 없거나 빈 문자열이면 경고창 띄우고 종료
		if (!result || result === '') {
			alert('검색어를 입력하세요');
			return;
		}
		if (enableClick) {
			setEnableClick(false);
			setLoading(true);
			frame.current.classList.remove('on');

			getFlickr({
				type: 'search',
				count: 50,
				tags: result,
			});
			input.current.value = '';
		}
	};

	//처음 컴포넌트가 생성이 되면 위에 정의한 getFlickr함수 호출
	useEffect(() => {
		//처음 로딩시
		getFlickr({
			type: 'interest',
			count: 50,
		});

		//  getFlickr(url1);
	}, []);

	return (
		<>
			<Layout name={'Masonry'}>
				{/* loading state값이 true일때 로딩바 보이게 처리하고 */}
				{loading ? (
					<img className='loading' src={path + '/img/loading.gif'} />
				) : null}
				<div className='searchBox'>
					<input
						type='text'
						ref={input}
						onKeyUp={(e) => {
							//입력된 키보드값이 엔터일때 함수 실행
							if (e.key === 'Enter') {
								showSearch();
							}
						}}
					/>
					<button onClick={showSearch}>search</button>
				</div>
				{/* 각 버튼 클릭시 setLoading(true)로 로딩바 보이게 처리 */}
				<button
					onClick={() => {
						if (enableClick) {
							setEnableClick(false);
							setLoading(true);
							frame.current.classList.remove('on');
							//getFlickr가 호출되서 컴포넌트가 로딩완료되면 내부적으로 다시 로딩바 사라짐
							getFlickr({
								type: 'interest',
								count: 50,
							});
						}
					}}>
					interest 갤러리 보기
				</button>

				<div className='frame' ref={frame}>
					{/* 움직일 자식 컴포넌트를 감싸주고 옵션설정 */}
					<Maconry
						elementType={'div'} //warpping 태그명 지정
						options={masonryOptions} //위에서 설정한 옵션값 적용
					>
						{items.map((item, idx) => {
							return (
								<article
									key={idx}
									onClick={() => {
										setIndex(idx);
										pop.current.open();
									}}>
									<div className='inner'>
										<div className='pic'>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
											/>
										</div>
										<h2>{item.title}</h2>
									</div>
								</article>
							);
						})}
					</Maconry>
				</div>
			</Layout>

			<Popup ref={pop}>
				{ready && (
					<img
						src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`}
					/>
				)}
				<span onClick={() => pop.current.close()}>close</span>
			</Popup>
		</>
	);
}

export default Masonry;
