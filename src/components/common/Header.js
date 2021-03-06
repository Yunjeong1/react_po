import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';

function Header(props) {
	const active = { color: 'aqua' };
	const menu = useRef(null);

	return (
		<>
			<header className={props.type}>
				<div className='inner'>
					<h1>
						<NavLink exact to='/' activeStyle={active}>
							LOGO
						</NavLink>
					</h1>

					<ul id='gnb'>
						<li>
							<NavLink to='/member' activeStyle={active}>
								Member
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/masonry' activeStyle={active}>
								Masonry
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/location' activeStyle={active}>
								Location
							</NavLink>
						</li>
						<li>
							<NavLink to='/join' activeStyle={active}>
								Join
							</NavLink>
						</li>
					</ul>

					<FontAwesomeIcon
						icon={faBars}
						onClick={() => {
							menu.current.open();
						}}
					/>
				</div>
			</header>

			<Menu ref={menu} />
		</>
	);
}

export default Header;
