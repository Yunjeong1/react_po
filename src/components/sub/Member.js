import { useEffect, useRef } from 'react';

function Member() {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
		return () => {
			console.log('멤버 컴포넌트 소멸');
		};
	}, [frame]);

	return (
		<section className='content member' ref={frame}>
			<figure></figure>
			<div className='inner'>
				<h1>Member</h1>
			</div>
		</section>
	);
}

export default Member;
