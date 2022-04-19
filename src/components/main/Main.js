import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Vids from './Vids';
import Pics from './Pics';
import Btn from './Btn';
import Anime from '../../class/anim';
import { useRef, useEffect, useState } from 'react';

function Main() {
	//메인콘텐츠 프레임을 참조할 min객체 추가
	const main = useRef(null);
	//세로 위치값이 배열로 참조될 pos객체 추가
	const pos = useRef([]);
	const [index, setIndex] = useState(0);

	//참조된 main의 자식인 .myScroll요소를 모두 찾은뒤, 세로 위치값을 pos(ref)에 옮겨담을 함수를 정의
	const getPos = () => {
		const secs = main.current.querySelectorAll('.myScroll');
		pos.current = [];
		for (const sec of secs) pos.current.push(sec.offsetTop);
		console.log(pos.current);
	};

	const activation = () => {
		const base = -200;
		let scroll = window.scrollY;
		const btns = main.current.querySelectorAll('.btns li');

		pos.current.map((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				btns[idx].classList.add('on');
			}
		});
	};

	//컴포넌트 생성시 getPos호출해서 각 섹션별 세로 위치값 구함
	useEffect(() => {
		//처음 로딩시 섹션별 세로 위치값 저장
		getPos();
		//브라우저 리사이즈시 세로 위치값 저장
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		//메인컴포넌트가 사라질때 window 전역에 등록된 getPos함수 제거
		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);

	useEffect(() => {
		//index값이 변경될때마다 해당 순번의 위치로 스크롤 이동
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[index],
			duration: 500,
		});
	}, [index]);

	return (
		<>
			<main ref={main}>
				<Header type={'main'} />
				<Visual />
				<News />
				<Vids />
				<Pics />
				<Btn setIndex={setIndex} />
			</main>
		</>
	);
}

export default Main;
