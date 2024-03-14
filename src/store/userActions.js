export const REQUEST_USER = "user_REQUEST";
export const SUCCESS_USER = "user_SUCCESS";
export const SET_USER = "user_SET_USER";
export const SET_LOGIN = "user_SET_LOGIN";
export const SET_LOGOUT = "user_SET_LOGOUT";

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setLogin = () => ({ type: SET_LOGIN });
export const setLogout = () => ({ type: SET_LOGOUT });
