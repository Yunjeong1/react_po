import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Menu = forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);
	const active = { color: 'aqua' };

	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
			close: () => setOpen(false),
		};
	});

	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.nav
						initial={{ x: -280, transition: { duration: 0.5 } }}
						animate={{ x: 0, transition: { duration: 0.5 } }}
						exit={{ x: -280, transition: { duration: 0.5 } }}
						onClick={() => setOpen(false)}>
						<h1>
							<NavLink exact to='/' activeStyle={active}>
								LOGO
							</NavLink>
						</h1>

						<ul id='gnb' onClick={() => setOpen(false)}>
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
					</motion.nav>
				</>
			)}
		</AnimatePresence>
	);
});

export default Menu;
