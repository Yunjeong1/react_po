import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
	const active = { color: 'aqua' };
	return (
		<header>
			<div className='inner'>
				<h1>
					<NavLink exact='true' to='/' activeStyle={active}>
						LOGO
					</NavLink>
				</h1>

				<ul id='gnb'>
					<li>
						<NavLink to='/gallery' activeStyle={active}>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeStyle={active}>
							Youtube
						</NavLink>
					</li>
				</ul>
			</div>
		</header>
	);
}

export default Header;
