import Layout from '../common/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/actions';

function Member() {
	const path = process.env.PUBLIC_URL;
	const members = useSelector((state) => state.memberReducer.members);
	//useDispatch로부터 action객체를 reducer로 전달해주는 함수를 반환받음
	const dispatch = useDispatch();
	//dispatch(); reducer로 action객체를 전송해주는 전송 함수

	//변경할 새로운 데이터
	const newMembers = [
		{
			name: 'Julia',
			position: 'CEO',
			pic: 'member3.jpg',
		},
		{
			name: 'Paul',
			position: 'Vice President',
			pic: 'member2.jpg',
		},
		{
			name: 'Michael',
			position: 'Designer',
			pic: 'member3.jpg',
		},
		{
			name: 'Emily',
			position: 'Front-End Dev',
			pic: 'member4.jpg',
		},
		{
			name: 'Kim',
			position: 'Back-End Dev',
			pic: 'member5.jpg',
		},
		{
			name: 'Emma',
			position: 'Project Manager',
			pic: 'member6.jpg',
		},
	];

	//setMembers함수의 인수로 변경할 데이터를 전달해서 action객체를 반환받음
	const action = setMembers(newMembers);

	return (
		<Layout name={'Member'}>
			{/* 수정버튼 클릭시 해당 액션객체를 dispatch를 통해서 reducer에 전달 */}
			<button onClick={() => dispatch(action)}>멤버정보 변경</button>

			<ul className='memberList'>
				{members.map((member, idx) => {
					return (
						<li key={idx}>
							<img src={`${path}/img/${member.pic}`} />
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Member;
