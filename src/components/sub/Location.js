import { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
	const path = process.env.PUBLIC_URL;
	//가상돔을 참조할 container객체를 useRef로 생성
	const container = useRef(null);
	//window 전역 객체안에서 kakao라는 객체를 찾은 후, kakao라는 변수이름으로 비구조화 할당
	const { kakao } = window;

	//각 지점별 정보값을 배열로 그룹핑
	const info = [
		{
			title: '삼성동 코엑스',
			latlng: new kakao.maps.LatLng(37.512714519901536, 127.06064893707484),
			imgSrc: `${path}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(110, 90) },
		},
		{
			title: '광화문 정문',
			latlng: new kakao.maps.LatLng(37.512714519901536, 127.06064893707484),
			imgSrc: `${path}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(110, 90) },
		},
		{
			title: '남산타워',
			latlng: new kakao.maps.LatLng(37.512714519901536, 127.06064893707484),
			imgSrc: `${path}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(110, 90) },
		},
	];

	//카카오맵 api를 통해서 생성된 인스턴스를 옮겨담을 state 추가
	//map에 담길 데이터의 자료값을 모를때는 null값 지정
	const [map, setMap] = useState(null);
	//traffic버튼 토글 기능을 위한 state 추가
	const [traffic, setTraffic] = useState(false);
	const [mapInfo, setMapInfo] = useState(info);
	//지점 순번을 관리할 state생성
	const [index, setIndex] = useState(0);

	useEffect(() => {
		container.current.innerHTML = '';
		//위치 정보값을 객체로 받아 화면에 지도표시 인스턴스 생성
		const options = {
			center: mapInfo[index].latlng,
			level: 3,
		};

		//첫번째 인수로 지도가 들어갈 프레임 등록, 두번째 인수로 지도위치, 줌레벨 옵션값 등록해서 인스턴스 생성
		const mapInstance = new kakao.maps.Map(container.current, options);

		//마커 위치, 마커이미지 정보값을 객체로 받아서 마커표시 인스턴스 생성
		const markerPosition = mapInfo[index].latlng;

		//마커 이미지 추가
		const imgSrc = mapInfo[index].imgSrc;
		const imgSize = mapInfo[index].imgSize;
		const imgPos = mapInfo[index].imgPos;
		const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);

		// 마커를 생성
		const marker = new kakao.maps.Marker({
			position: markerPosition,
			image: markerImg,
		});

		//해당 지도인스턴에스 마커를 세팅
		marker.setMap(mapInstance);

		const mapTypeControl = new kakao.maps.MapTypeControl();
		mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

		const zoomControl = new kakao.maps.ZoomControl();
		mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

		//지도 위치 가운데 이동 함수
		const mapInit = () => {
			console.log('지도위치 가운데 변경');
			mapInstance.setCenter(mapInfo[index].latlng);
		};

		setMap(mapInstance);

		//브라우저 리사이즈시 mapInit호출
		window.addEventListener('resize', mapInit);

		//해당 컴포넌트가 사라질때 전역 window에 등록되어 있는 이벤트 핸들러도 같이 삭제
		return () => {
			window.removeEventListener('resize', mapInit);
		};
	}, [index]);

	//traffic값이 변경될때마다 실행되는 useEffect 호출
	useEffect(() => {
		//console.log(traffic);
		handleTraffic();
	}, [traffic]);

	//traffic표시 함수 정의
	const handleTraffic = () => {
		//map state값이 있을때에만 동작되게 조건문 처리
		if (map) {
			traffic
				? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
	};

	return (
		<Layout name={'Location'}>
			{/* container객체를 해당 가상돔에 참조 */}
			<div id='map' ref={container}></div>

			{/* 해당 버튼을 클릭할때마다 기존 boolean값을 반전시켜서 토글기능 실행 */}
			<button onClick={() => setTraffic(!traffic)}>
				{traffic ? 'Traffic OFF' : 'Traffic On'}
			</button>

			{/* mapInfo를 통해 동적으로 버튼 생성 */}
			<ul className='branch'>
				{mapInfo.map((info, idx) => {
					return (
						<li
							key={idx}
							onClick={() => {
								setIndex(idx);
							}}>
							{info.title}
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Location;
