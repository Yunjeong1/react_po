import { useRef, useEffect } from 'react';
import Layout from '../common/Layout';

function Location() {
	const container = useRef(null);
	//window 전역 객체안에서 kakao라는 객체를 찾은 후, kakao라는 변수이름으로 비구조화 할당
	const { kakao } = window;

	useEffect(() => {}, []);

	const options = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	const map = new kakao.maps.Map(container.current, options);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Location;
