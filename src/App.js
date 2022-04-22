import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';

import './scss/style.scss';
//common 컴포넌트
import Header from './components/common/Header';
import Footer from './components/common/Footer';
//main 컴포넌트
import Main from './components/main/Main';
//sub 컴포넌트
import Youtube from './components/sub/Youtube';
import Gallery from './components/sub/Gallery';
import Masonry from './components/sub/Masonry';
import Member from './components/sub/Member';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Community from './components/sub/Community';
import { useEffect } from 'react';

const path = process.env.PUBLIC_URL;

function App() {
	//비어있는 reducer데이터에 정보값을 전송하기 위한 dispatch함수 활성화
	const dispatch = useDispatch();
	//const abc = useSelector((state) => state.memberReducer.members);

	//App 컴포넌트가 실제 출력이되면 그때 fetchYoutbe함수를 호출해서
	//비동기로 받아진 데이터를 리듀서를 통해 store에 전역으로 저장해줌
	useEffect(() => {
		dispatch({ type: types.MEMBER.start });
		dispatch({ type: types.FLICKR.start, opt: { type: 'interest' } });
		dispatch({ type: types.YOUTUBE.start });
	}, []);

	// useEffect(() => {
	// 	console.log(abc);
	// }, [abc]);

	/*
	//추가된 데이터를 확인
	useEffect(() => {
		console.log(vidData);
	}, [vidData]);
	*/

	return (
		<>
			{/* Switch 같은 경로의 router연결시 구체적인 라우터 하나만 적용 */}
			<Switch>
				<Route exact path='/'>
					{/* 메인에만 적용되는 header */}
					<Header type={'main'} />
					<Main />
				</Route>

				<Route path='/'>
					{/* 서브에만 적용되는 header */}
					<Header type={'sub'} />
				</Route>
			</Switch>

			<Route path='/youtube' component={Youtube} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/masonry' component={Masonry} />
			<Route path='/member' component={Member} />
			<Route path='/location' component={Location} />
			<Route path='/join' component={Join} />

			<Footer />
		</>
	);
}

export default App;
