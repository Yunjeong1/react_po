//해당함수는 인수로 전달된 값을 payload 키값에 넣고, type이 SET_MEMBERS인 액션객체에 담아 리턴
export const setMembers = (member) => {
	return {
		type: 'SET_MEMBERS',
		payload: member,
	};
};

export const setYoutube = (data) => {
	return {
		type: 'SET_YOUTUBE',
		payload: data,
	};
};

/*
변경할 데이터를 setMembers함수에 인수로 담아 호출하면
setMembers('변경할 멤버 데이터');

다음과 같은 액션객체를 반환
{
  type: 'SET_MEMBERS',
  payload: 변경될 데이터
}
*/
