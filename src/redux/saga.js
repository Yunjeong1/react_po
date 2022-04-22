import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube, getMember } from './api';
import * as types from './actionType';
import { type } from '@testing-library/user-event/dist/type';

/*
  takeLatest: 인수로 action type을 받아서 해당 액션타입 발생시 가장 최근에 발생한 함수 호출
  takeEvery: 액션타입이 발생할때마다
  call: 특정 함수를 동기적으로 호출
  fork: 특정 함수를 비동기적으로 호출(동시다발적)
  put: 기존 dispatch와 동일(전달)
  all: fork함수를 그룹화해서 실행할때
*/

export function* returnMember() {
	try {
		const response = yield call(getMember);
		yield put({
			type: types.MEMBER.success,
			payload: response.data.data,
		});
	} catch (err) {
		yield put({ type: types.MEMBER.error, payload: err });
	}
}

export function* callMember() {
	yield takeLatest(types.MEMBER.start, returnMember);
}

//action타입에 따라서 변경 및 실행될 generator함수
export function* returnFlickr(action) {
	//getFlickr함수에 action객체로 넘어온 opt값을 인수로 전달해서 호출
	try {
		const response = yield call(getFlickr, action.opt);
		//반환된 결과값을 FLICKR_SUCCESS타입 액션의 payload에 담아서 다시 reducer에 전달
		yield put({
			type: types.FLICKR.success,
			payload: response.data.photos.photo,
		});
	} catch (err) {
		//해당 api호출이 실패했을때 예외처리
		//에러내용을 reducer에 전달
		yield put({ type: type.FLICKR.error, payload: err });
	}
}

//FLICKR_START타입의 액션 발생시
//두번째 인수인 returnFlickr함수 호출
export function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}

export function* returnYoutube() {
	try {
		const response = yield call(getYoutube);
		yield put({
			type: types.YOUTUBE.success,
			payload: response.data.items,
		});
	} catch (err) {
		yield put({ type: types.YOUTUBE.error, payload: err });
	}
}

export function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

//위의 함수를 비동기적으로 호출(reducer의 미들웨어 적용되어 실행할 함수)
export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube), fork(callMember)]);
}
