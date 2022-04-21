import Layout from '../common/Layout';
import { useSelector } from 'react-redux';

function Member() {
	const path = process.env.PUBLIC_URL;
	const members = useSelector((state) => state.memberReducer.members);

	return (
		<Layout name={'Member'}>
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
