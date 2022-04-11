import { Route } from 'react-router-dom';
import './scss/style.scss';
//common 컴포넌트
import Header from './components/common/Header';
import Footer from './components/common/Footer';
//main 컴포넌트
import Visual from './components/main/Visual';
import Content from './components/main/Content';
//sub 컴포넌트
import Youtube from './components/sub/Youtube';
import Gallery from './components/sub/Gallery';

function App() {
	return (
		<>
			<Header />

			<Route exact path='/'>
				<Visual />
				<Content />
			</Route>

			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />

			<Footer />
		</>
	);
}

export default App;
