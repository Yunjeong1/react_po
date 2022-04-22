import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../common/Layout';

function Gallery() {
	const { flickr } = useSelector((state) => state.flickrReducer);
	const dispatch = useDispatch();
	const [opt, setOpt] = useState({ type: 'interest' });
	const input = useRef(null);

	useEffect(() => {
		dispatch({ type: 'FLICKR_START', opt });
	}, [opt]);

	const initGallery = () => {
		setOpt({ type: 'interest' });
	};

	const searchTag = () => {
		const tag = input.current.value;
		setOpt({ type: 'search', tags: tag });
	};

	return (
		<Layout name={'Gallery'}>
			<button onClick={initGallery}>갤러리 초기화</button>

			<div className='inputBox'>
				<input type='text' ref={input} />
				<button onClick={searchTag}>검색</button>
			</div>

			<ul>
				{flickr.map((item, idx) => {
					return (
						<li key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
									/>
								</div>
								<h2>{item.title}</h2>
							</div>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Gallery;
