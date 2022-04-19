import { useState, useEffect } from 'react';
function News() {
	//메인페이지에서 로컬스토리지에 접근해서 데이터 반환
	const getLocalData = () => {
		const data = localStorage.getItem('posts');
		const dummyData = [
			{ title: 'Hello5', content: 'Here comes description in detail.' },
			{ title: 'Hello4', content: 'Here comes description in detail.' },
			{ title: 'Hello3', content: 'Here comes description in detail.' },
			{ title: 'Hello2', content: 'Here comes description in detail.' },
			{ title: 'Hello1', content: 'Here comes description in detail.' },
		];
		if (data) {
			return JSON.parse(data);
		} else {
			return dummyData;
		}
	};
	//반환된 데이터를 state에 저장
	const [posts] = useState(getLocalData);
	//처음 로딩시 더미데이터를 state에 저장하자 마자 바로 로컬스토리지에 저장
	useEffect(() => {
		localStorage.setItem('posts', JSON.stringify(posts));
	}, []);
	return (
		<section id='news' className='myScroll'>
			<h1>Recent News</h1>

			<ul>
				{/* posts값중에서 최근글 3개까지만 화면에 출력 */}

				{posts.map((post, idx) => {
					if (idx < 3) {
						return (
							<li key={idx}>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
							</li>
						);
					}
				})}
			</ul>
		</section>
	);
}
export default News;
