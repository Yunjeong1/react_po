import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Popup = forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);

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
					<motion.aside
						className='popup'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0.5 } }}>
						{/* 유튜브 영상이 뒤늦게 로딩되어 깜박이는 문제해결을 위해 팝업이 생성되고 0.5초뒤에 유튜브영상 페이드인 처리 */}
						<motion.div
							className='con'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0.5 } }}
							exit={{ opacity: 0 }}>
							{props.children}
						</motion.div>
					</motion.aside>
				</>
			)}
		</AnimatePresence>
	);
});

export default Popup;
