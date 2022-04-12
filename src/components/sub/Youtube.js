import { useEffect, useRef } from 'react';

function Youtube() {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');

		return () => {
			console.log('유튜브 컴포넌트 소멸');
		};
	}, []);

	return (
		<section className='content youtube' ref={frame}>
			<figure></figure>
			<div className='inner'>
				<h1>Youtube</h1>
			</div>
		</section>
	);
}

export default Youtube;
