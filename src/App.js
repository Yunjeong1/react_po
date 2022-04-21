import { Route, Switch } from 'react-router-dom';
//root컴포넌트인 App에서 store데이터를 가져오고 저장하기 위함
import { useDispatch, useSelector } from 'react-redux';
//reducer에 변경된 데이터를 전송하기 위한 action객체 생성함수로 불러옴
import { setMembers, setYoutube } from './redux/actions';
//메인 컴포넌트에서 모든 api통신을 위해 axios 불러옴
import axios from 'axios';
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
	const abc = useSelector((state) => state.memberReducer.members);

	const fetchMembers = async () => {
		const url = path + '/DB/' + 'member.json';
		await axios.get(url).then((json) => {
			dispatch(setMembers(json.data.data));
		});
	};

	//dispatch로 전달할 데이터를 비동기로 가져오기 위한 axios함수 정의
	const fetchYoutube = async () => {
		const key = 'AIzaSyB81cXmxoWdzbYs8QZUlN_LQskZFT_Xqoo';
		const num = 5;
		const id = 'PLMaY0ixOiyljR7EsFnCk9HPiR7eNsI6Yd';
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&maxResults=${num}&playlistId=${id}`;

		//axios로 비동기 데이터 가져옴
		await axios.get(url).then((json) => {
			//가져온 데이터를 setYoutube함수의 인수로 넣어서 action객체를 생성
			//생성된 action객체를 dispatch함수로 다시 리듀서에 전달
			dispatch(setYoutube(json.data.items));
		});
	};

	//App 컴포넌트가 실제 출력이되면 그때 fetchYoutbe함수를 호출해서
	//비동기로 받아진 데이터를 리듀서를 통해 store에 전역으로 저장해줌
	useEffect(() => {
		fetchMembers();
		fetchYoutube();
	}, []);

	useEffect(() => {
		console.log(abc);
	}, [abc]);
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
