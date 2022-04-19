import { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);

	//localStorage의 데이터를 반환하는 함수
	const getLocalData = () => {
		let data = localStorage.getItem('posts');
		data = JSON.parse(data);
		return data;
	};

	//getLocalData로 반환된 값을 posts 스테이트에 저장
	const [posts, setPosts] = useState(getLocalData);

	const resetPost = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		//입력된 내용에서 혹시라도 빈칸이 있는 내용을 trim으로 제거해서 전달(trim - 모든 좌우 빈칸 제거)
		const inputVal = input.current.value.trim();
		const textareaVal = textarea.current.value.trim();

		//전달된 값이 아예 없거나 빈칸만 있을떄에는 경고창 출력후 종료
		if (!inputVal || !textareaVal) {
			alert('제목과 본문을 모두 입력하세요');
			return;
		}
		setPosts([{ title: inputVal, content: textareaVal }, ...posts]);
		resetPost();
	};

	//순서2 - 삭제할 순서를 인수로 전달
	const deletePost = (index) => {
		console.log('삭제할 포스트 순번', index);
		//filter메소드로 삭제한 순번만 제외한 나머지 순번의 포스트를 반환해서 반환된 값을 setPosts로 state변경
		setPosts(posts.filter((_, idx) => idx !== index));
	};

	const updatePost = (index) => {
		const inputVal = editInput.current.value.trim();
		const textareaVal = editTextarea.current.value.trim();

		if (!inputVal || !textareaVal) {
			alert('제목과 본문을 모두 입력하세요');
			return;
		}
		setPosts(
			//기존 state값을 반복을 돌면서
			posts.map((post, idx) => {
				//반복도는 순번과 인수로 전달받은 저장할 순번이 같으면
				if (idx === index) {
					//useRef로 참조한 수정 input,textarea의 값을 가지고와서 해당 포스트에 저장
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					//해당 포스트의 enableUpdate값을 false로 변경해서 다시 출력모드로 변경
					post.enableUpdate = false;
				}
				//이렇게 변경된 post를 반환해서 전체 posts state 변경
				return post;
			})
		);
	};

	const enableUpdate = (index) => {
		setPosts(
			//현재 반복도는 state순서값과 인수로 받은 수정할 포소트의 순서값이 동일하면, 해당 post객체에 enableUpdate,true라는 키,값을 추가해서 기존 posts 스테이트값 변경
			posts.map((post, idx) => {
				if (index === idx) post.enableUpdate = true;
				return post;
			})
		);
	};

	const disableUpdate = (index) => {
		setPosts(
			posts.map((post, idx) => {
				if (index === idx) post.enableUpdate = false;
				return post;
			})
		);
	};

	useEffect(() => {
		console.log('posts state 변경됨');
		//localStorage에 'posts'란 이름으로 기존 객체 데이터를 문자로 변경해서 저장
		localStorage.setItem('posts', JSON.stringify(posts));

		//localStorage에 있는 데이터를 가져와서 다시 객체형태로 변환
		// let data = localStorage.getItem('posts');
		// JSON.parse(data);
	}, [posts]);

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
				<button onClick={resetPost}>cancel</button>
				<button onClick={createPost}>create</button>
			</div>

			<div className='showBox'>
				{posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								// 반복도는 해당 state에 enabelUpdate값이 true면 수정화면 렌더링
								<>
									<input
										type='text'
										defaultValue={post.title}
										ref={editInput}
									/>
									<br />
									<textarea
										defaultValue={post.content}
										ref={editTextarea}></textarea>

									<div className='btns'>
										<button onClick={() => disableUpdate(idx)}>cancel</button>
										{/* 수정모드의 저장버튼 클릭시 해당 순서값을 updatePost에 전달해서 호출 */}
										<button onClick={() => updatePost(idx)}>save</button>
									</div>
								</>
							) : (
								// 반복을 도는 해당 state에 enabelUpdate값이 false면 출력화면 렌더링
								<>
									<h2>{post.title}</h2>
									<p>{post.content}</p>

									<div className='btns'>
										{/* 수정버튼 클릭시 해당 포스트의 순서값을 enableUpdate함수로 전달 */}
										<button onClick={() => enableUpdate(idx)}>edit</button>
										{/* 순서1 - 삭제버튼 클릭시 삭제 포스트와 순서값 전달, ()=>{} 콜백 넣어야 한템포 뒤에 작동함 */}
										<button onClick={() => deletePost(idx)}>delete</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
