import React from 'react';
import { useSelector } from 'react-redux';
const path = process.env.PUBLIC_URL;

function Footer() {
	const members = useSelector((state) => state.memberReducer.members);

	return (
		<footer>
			<div className='inner'>
				<div className='members'>
					{members.map((item, idx) => (
						<img key={idx} src={`${path}/img/${item.pic}`} />
					))}
				</div>

				<p>2022 DCODELAB &copy; ALL RIGHT DESERVED</p>
			</div>
		</footer>
	);
}

export default Footer;
