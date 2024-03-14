import { getUserDataMok } from "./utils.js";
export const OPEN = "chat_OPEN";
export const CLOSE = "chat_CLOSE";
export const INIT_USER_INFO = "chat_INIT_USER_INFO";
export const MAIN = "chat_MAIN";
export const ROOM1 = "chat_ROOM1";
export const ROOM2 = "chat_ROOM2";
export const GET_USER_DATA = "chat_GET_USER_DATA";
export const SET_USER_DATA = "chat_SET_USER_DATA";
export const NOT_USER_DATA = "chat_NOT_USER_DATA";
export const SET_USER_NICKNAME = "chat_SET_USER_NICKNAME";
export const REQUEST_START = "chat_START_REQUEST";
export const REQUEST_SUCCESS = "chat_REQUEST_SUCCESS";
export const REQUEST_ERROR = "chat_REQUEST_ERROR";
export const SET_MSG = "chat_SET_MSG";
export const SET_MSGS = "chat_SET_MSGS";
export const GET2DATA = "chat_ROOM2_GET_DATA";
export const GET1DATA = "chat_ROOM1_GET_DATA";

export const chatOpen = () => ({ type: OPEN });
export const chatClose = () => ({ type: CLOSE });
export const initUserInfo = (data) => ({ type: INIT_USER_INFO, payload: data });
export const selectMain = () => ({ type: MAIN });
export const selectRoom1 = () => ({ type: ROOM1 });
export const selectRoom2 = () => ({ type: ROOM2 });
export const requestStart = () => ({ type: REQUEST_START });
export const requestSuccess = () => ({ type: REQUEST_SUCCESS });
export const requestError = () => ({ type: REQUEST_ERROR });
export const notUserAction = () => ({ type: NOT_USER_DATA });
// export const getUserData = (data) => ({ type: GET_USER_DATA, payload: data });
export const getUserData = () => async (dispatch, getState) => {
  // const userData = await fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json());
  const nickName = localStorage.getItem("nickName");
  if (!nickName) return dispatch(notUserAction());
  dispatch(requestStart());
  try {
    const user = await getUserDataMok(nickName);
    dispatch(setUserData(user));
  } catch (e) {
    dispatch(requestError());
  }
};

export const setUserData = (data) => ({ type: SET_USER_DATA, payload: data });

// {msgType: 'A', roomType: 'A', msg: 'zzz이 입장하셨습니다.'}
export const setMsgs = (data) => ({ type: SET_MSGS, payload: data });
export const setMsg = (data, roomType) => ({
  type: SET_MSG,
  payload: data,
  roomType,
});
export const getRoom1Data = (data) => ({ type: GET1DATA, payload: data });
export const getRoom2Data = (data) => ({ type: GET2DATA, payload: data });

export const getRoom1 = (store) => (dispatch) => (action) => {
  store.dispatch(requestStart());
  try {
  } catch (e) {}
};
