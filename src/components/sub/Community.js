import { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);

	const dummyPosts = [
		{ title: 'Hello5', content: 'Here comes description in detail.' },
		{ title: 'Hello4', content: 'Here comes description in detail.' },
		{ title: 'Hello3', content: 'Here comes description in detail.' },
		{ title: 'Hello2', content: 'Here comes description in detail.' },
		{ title: 'Hello1', content: 'Here comes description in detail.' },
	];

	const [posts, setPosts] = useState(dummyPosts);

	const resetPost = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		setPosts([
			{ title: input.current.value, content: textarea.current.value },
			...posts,
		]);
		resetPost();
	};

	//순서2 - 삭제할 순서를 인수로 전달
	const deletePost = (index) => {
		console.log('삭제할 포스트 순번', index);

		//filter메소드로 삭제한 순번만 제외한 나머지 순번의 포스트를 반환해서 반환된 값을 setPosts로 state변경
		setPosts(posts.filter((post, idx) => idx !== index));
	};

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea
					cols='30'
					rows='10'
					placeholder='본문을 입력하세요'
					ref={textarea}></textarea>
				<br />
				<button>cancel</button>
				<button onClick={createPost}>create</button>
			</div>

			<div className='showBox'>
				{posts.map((post, idx) => {
					return (
						<article key={idx}>
							<h2>{post.title}</h2>
							<p>{post.content}</p>

							<div className='btns'>
								{/* 순서1 - 삭제버튼 클릭시 삭제 포스트와 순서값 전달, ()=>{} 콜백 뒤에 넣어야 한템포 뒤에 작동함 */}
								<button onClick={() => deletePost(idx)}>delete</button>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
