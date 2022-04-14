import { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
	const path = process.env.PUBLIC_URL;
	//가상돔을 참조할 container객체를 useRef로 생성
	const container = useRef(null);
	//window 전역 객체안에서 kakao라는 객체를 찾은 후, kakao라는 변수이름으로 비구조화 할당
	const { kakao } = window;
	//카카오맵 api를 통해서 생성된 인스턴스를 옮겨담을 state 추가
	//map에 담길 데이터의 자료값을 모를때는 null값 지정
	const [map, setMap] = useState(null);
	//traffic버튼 토글 기능을 위한 state 추가
	const [traffic, setTraffic] = useState(false);

	useEffect(() => {
		const options = {
			center: new kakao.maps.LatLng(37.512742, 127.06081),
			level: 3,
		};

		//첫번째 인수로 지도가 들어갈 프레임 등록, 두번째 인수로 지도위치, 줌레벨 옵션값 등록해서 인스턴스 생성
		const mapInfo = new kakao.maps.Map(container.current, options);
		//인스턴스 map을 state map으로 옮겨담음
		setMap(mapInfo);

		//마커 위치 인스턴스 생성
		const markerPosition = new kakao.maps.LatLng(37.512742, 127.06081);

		//마커 이미지 추가
		const imgSrc = `${path}/img/marker1.png`;
		const imgSize = new kakao.maps.Size(232, 99);
		const imgOption = { offset: new kakao.maps.Point(110, 90) };
		const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);

		// 마커를 생성합니다
		const marker = new kakao.maps.Marker({
			position: markerPosition,
			image: markerImg,
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(mapInfo);

		// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
		// marker.setMap(null);
	}, []);

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
		</Layout>
	);
}

export default Location;
