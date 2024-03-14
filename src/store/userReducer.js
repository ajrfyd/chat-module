import {
  SUCCESS_USER,
  REQUEST_USER,
  SET_USER,
  SET_LOGIN,
  SET_LOGOUT,
} from "./userActions.js";

const userReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_USER:
      return {
        ...state,
        isLogin: true,
        loading: false,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case SUCCESS_USER:
      return {
        ...state,
        loading: false,
      };
    case SET_LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case SET_LOGOUT:
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
