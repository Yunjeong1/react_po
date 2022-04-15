import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Join() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		edu: '',
		comments: '',
		gender: null,
		interests: null,
	};
	//value값 state 관리
	const [val, setVal] = useState(initVal);

	//인증실패시 담길 에러메시지를 객체로 state 관리
	const [err, setErr] = useState({});

	const [success, setSuccess] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);

	//인증실패시 에러객체를 생성할 함수
	//순서4 - 인수로 state val값을 전달
	const check = (val) => {
		const errs = {};
		const eng = /[A-Za-z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*]/;

		if (val.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}

		if (
			val.pwd1 < 5 ||
			!eng.test(val.pwd1) ||
			!num.test(val.pwd1) ||
			!spc.test(val.pwd1)
		) {
			errs.pwd1 =
				'비밀번호는 5글자 이상, 문자, 숫자, 특수문자를 모두 포함하세요';
		}

		if (val.pwd1 !== val.pwd2 || !val.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요';
		}

		if (val.email < 5 || !/@/.test(val.email)) {
			errs.email = '이메일주소는 @를 포함하여 5글자 이상 입력하세요';
		}

		if (val.comments.length < 10) {
			errs.comments = '코멘트를 10글자 이상 입력하세요';
		}

		if (!val.gender) {
			errs.gender = '성별을 선택하세요';
		}

		if (!val.interests) {
			errs.interests = '관심사를 한개 이상 선택하세요';
		}

		if (val.edu == '') {
			errs.edu = '최종학력을 선택하세요';
		}

		return errs;
	};

	//인풋요소에 값을 입력할때마다 실행할 함수
	//해당 입력된 인풋 요소의 name, value값으로
	//기존 state값을 변경
	const handleChange = (e) => {
		//순서2- 입력하고 있는 인풋 요소의 name, value값 변수에저장
		const { name, value } = e.target;
		//console.log(`name: ${name}, value: ${value}`);
		//순서3 - 기본 val을 복사해서 방급 입력받은 value값으로 덮음
		setVal({ ...val, [name]: value }); // setVal({ ...val, 'userid': value }); 와 같음 - 영감배열: []는 객체의 키값을 받아오는 역할
		//console.log(val);
	};

	//SEND버튼 클릭시 실행할 함수
	//순서2 - 해당함수가 호출
	const handleSubmit = (e) => {
		e.preventDefault();
		//순서3 - 현재 val의 값을 check함수의 인수로 전달
		setErr(check(val));
		//순서5 - 반환된 결과값의 에러객체가
		//setErr함수에 의해서 err스테이트에 전달
	};

	const handleRadio = (e) => {
		const { name } = e.target; //e.target의 name값을 비구조 할당으로 가져옴
		const isChecked = e.target.checked;
		setVal({ ...val, [name]: isChecked });
	};

	const handleCheck = (e) => {
		let isChecked = false;
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		inputs.forEach((el) => {
			if (el.checked) isChecked = true;
		});
		setVal({ ...val, [name]: isChecked });
	};

	const handleSelect = (e) => {
		const { name } = e.target;
		const isSelected = e.target.options[e.target.selectedIndex].value;
		setVal({ ...val, [name]: isSelected });
	};

	const handleReset = () => {
		setVal(initVal);
		setErr({});
	};

	//err state값이 변경될때마다 동작하는 함수
	//순서6 - err스테이트가 의존성에 등록되어 있으므로
	//err 값이 변경될떄마다 콘솔문 출력
	useEffect(() => {
		console.log(err);
		//객체의 키값을 반환하는 메소드
		const len = Object.keys(err).length;

		if (len === 0 && isSubmit) {
			setSuccess(true);
			//err값이 의존성으로 등록되어있는 useEffect안에
			//다시 err스테이트를 변경하는 함수나 구문이 있으면 무한루프에 빠지니 주의해야함
			//handleReset();
		} else {
			setSuccess(false);
		}
	}, [err]);

	//success 스테이트값을 의존성 배열로해서
	useEffect(() => {
		//success값이 true로 변경되면
		//기존 인풋요소 초기화
		handleReset();
	}, [success]);

	return (
		<Layout name={'Join'}>
			{success ? <h2>회원가입을 축하합니다!</h2> : null}
			{/* 순서1- 전송버튼 눌러서 submit이벤트 발생시 handleSubmit호출 */}
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1'>
						<caption>회원가입 정보입력</caption>
						<tbody>
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										name='userid'
										id='userid'
										placeholder='아이디를 입력하세요'
										//순서4 - 변경된 val 스테이트의 userid값을 인풋요소에 출력
										value={val.userid}
										//순서1 - 인풋에 값을 입력하면 handleChange함수 호출
										onChange={handleChange}
									/>
									<span className='err'>{err.userid}</span>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요'
										value={val.pwd1}
										onChange={handleChange}
									/>
									<span className='err'>{err.pwd1}</span>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>RE PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요'
										value={val.pwd2}
										onChange={handleChange}
									/>
									<span className='err'>{err.pwd2}</span>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor=''>EMAIL</label>
								</th>
								<td>
									<input
										type='email'
										name='email'
										id='email'
										placeholder='이메일을 입력하세요'
										value={val.email}
										onChange={handleChange}
									/>
									<span className='err'>{err.email}</span>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='edu'>Education</label>
								</th>
								<td>
									<select name='edu' id='edu' onChange={handleSelect}>
										<option value=''>학력을 선택하세요</option>
										<option value='elemantary-school'>초등학교 졸업</option>
										<option value='middle-school'>중학교 졸업</option>
										<option value='high-school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									<span className='err'>{err.edu}</span>
								</td>
							</tr>
							<tr>
								<th scope='row'>GENDER</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input
										type='radio'
										name='gender'
										id='male'
										onChange={handleRadio}
									/>
									<label htmlFor='male'>Female</label>
									<input
										type='radio'
										name='gender'
										id='female'
										onChange={handleRadio}
									/>
									<span className='err'>{err.gender}</span>
								</td>
							</tr>
							<tr>
								<th scope='row'>Interests</th>
								<td>
									<label htmlFor='sports'>Sports</label>
									<input
										type='checkbox'
										name='interests'
										id='sports'
										onChange={handleCheck}
									/>
									<label htmlFor='game'>Game</label>
									<input
										type='checkbox'
										name='interests'
										id='game'
										onChange={handleCheck}
									/>
									<label htmlFor='music'>Music</label>
									<input
										type='checkbox'
										name='interests'
										id='music'
										onChange={handleCheck}
									/>
									<span className='err'>{err.interests}</span>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='comments'>Wrtie comments</label>
								</th>
								<td>
									<textarea
										name='comments'
										id='comments'
										cols='30'
										rows='10'
										value={val.comments}
										onChange={handleChange}></textarea>
									<span className='err'>{err.comments}</span>
								</td>
							</tr>
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' onClick={handleReset} />
									<input
										type='submit'
										value='SEND'
										onClick={() => {
											setIsSubmit(true);
										}}
									/>
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Join;
