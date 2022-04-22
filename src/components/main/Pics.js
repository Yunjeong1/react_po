import React from 'react';
import { useSelector } from 'react-redux';

function Pics() {
	const { flickr } = useSelector((state) => state.flickrReducer);
	return (
		<section id='pics' className='myScroll'>
			<h1>갤러리 미리보기</h1>
			<ul>
				{flickr.map((item, idx) => {
					if (idx < 3) {
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
					}
				})}
			</ul>
		</section>
	);
}

export default Pics;
