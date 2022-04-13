import styled from 'styled-components';

const Pop = styled.aside`
	width: 100%;
	height: 100vh;
	padding: 5vw;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.9);
	z-index: 10;

	> span {
		font: bold 14px/1 'arial';
		color: #fff;
		cursor: pointer;
		position: absolute;
		top: 3vw;
		right: 3vw;
	}

	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;

		iframe {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		> img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
`;

function Popup(props) {
	return (
		<Pop>
			<span onClick={() => props.pop(false)}>close</span>
			<div className='content'>{props.children}</div>
		</Pop>
	);
}

export default Popup;
