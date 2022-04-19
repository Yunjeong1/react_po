import React from 'react';

function Btn(props) {
	return (
		<ul className='btns'>
			<li className='on' onClick={() => props.setIndex(0)}></li>
			<li onClick={() => props.setIndex(1)}></li>
			<li onClick={() => props.setIndex(2)}></li>
			<li onClick={() => props.setIndex(3)}></li>
		</ul>
	);
}

export default Btn;
