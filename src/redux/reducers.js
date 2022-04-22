import { combineReducers } from 'redux';
import * as types from './actionType';

//초기데이터를 state에 저장했다가
//추후 action객체가 전달되면
//action객체의 타입에 따라 기존 데이터를 변경해서 리턴
const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case types.MEMBER.start:
			return { ...state };

		case types.MEMBER.success:
			return { ...state, members: action.payload };

		case types.MEMBER.error:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

//youtube 데이터를 관리할 reducer
const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case types.YOUTUBE.start:
			return { ...state };

		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };

		case types.YOUTUBE.error:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case types.FLICKR.start:
			return { ...state };

		case types.FLICKR.success:
			return { ...state, flickr: action.payload };

		case types.FLICKR.error:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

/*
위의 switch문과 동일한 구조
if(action.type){
  if(action.type==='SET_MEMBERS'){
    return{...state,members:action.payload}
  }else{
    return state;
  }
}
*/

//전달된 각각의 reducer를 하나로 합쳐서 반환
const reducers = combineReducers({
	memberReducer,
	youtubeReducer,
	flickrReducer,
});

export default reducers;
