import { useEffect, useRef } from 'react';

function Gallery() {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');

		return () => {
			console.log('갤러리 컴포넌트 소멸');
		};
	}, []);

	return (
		<section className='content gallery' ref={frame}>
			<figure></figure>
			<div className='inner'>
				<h1>Gallery</h1>
			</div>
		</section>
	);
}

export default Gallery;
