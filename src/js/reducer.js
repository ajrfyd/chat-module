import {
  OPEN,
  CLOSE,
  MAIN,
  ROOM1,
  ROOM2,
  GET_USER_DATA,
  NOT_USER_DATA,
  REQUEST_ERROR,
  SET_USER_DATA,
  REQUEST_START,
  REQUEST_SUCCESS,
  INIT_USER_INFO,
  SET_MSGS,
  SET_MSG,
} from "./action.js";

const reducer = (state, action) => {
  switch (action.type) {
    case OPEN:
      return {
        ...state,
        isOpen: true,
        page: {
          ...state.page,
          main: {
            isOpen: true,
          },
        },
        user: {
          ...state.user,
          isOpen: state.user.nickName ? false : true,
        },
        prevAction: action.type,
      };
    case CLOSE:
      return {
        ...state,
        isOpen: false,
        prevAction: action.type,
      };
    case INIT_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          socketId: action.payload.socketId,
          nickName: action.payload.nickName,
          id: action.payload.id,
          role: action.payload.role,
        },
        prevAction: action.type,
      };
    case MAIN:
      return {
        ...state,
        page: {
          ...state.page,
          main: {
            isOpen: true,
          },
          room1: {
            ...state.page.room1,
            isOpen: false,
          },
          room2: {
            ...state.page.room2,
            isOpen: false,
          },
        },
        user: {
          ...state.user,
          isOpen: state.user.nickName ? false : true,
        },
        prevAction: action.type,
      };
    case ROOM1:
      return {
        ...state,
        page: {
          main: {
            isOpen: false,
          },
          room1: {
            ...state.page.room1,
            isOpen: true,
          },
          room2: {
            ...state.page.room2,
            isOpen: false,
          },
        },
        user: {
          ...state.user,
          isOpen: state.user.nickName ? false : true,
        },
        prevAction: action.type,
      };
    case ROOM2:
      return {
        ...state,
        page: {
          main: {
            isOpen: false,
          },
          room1: {
            ...state.page.room1,
            isOpen: false,
          },
          room2: {
            ...state.page.room2,
            isOpen: true,
          },
        },
        user: {
          ...state.user,
          isOpen: state.user.nickName ? false : true,
        },
        prevAction: action.type,
      };
    case REQUEST_START:
      return {
        ...state,
        isLoading: true,
        prevAction: action.type,
      };
    case REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        prevAction: action.type,
      };
    case GET_USER_DATA:
      return {
        ...state,
        user: {
          ...action.payload,
        },
        prevAction: action.type,
      };
    case SET_USER_DATA:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          nickName: action.payload.nick_name,
          role: action.payload.role,
          socketId: action.payload.latest_connection_id,
          isOpen: false,
        },
        prevAction: action.type,
      };
    case NOT_USER_DATA:
      return {
        ...state,
        prevAction: action.type,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        prevAction: action.type,
      };
    case SET_MSGS:
      return {
        ...state,
        isLoading: false,
        prevAction: action.type,
        page: {
          ...state.page,
          [action.payload.roomType]: {
            ...state.page[action.payload.roomType],
            msgList: action.payload.msgList,
          },
        },
      };
    case SET_MSG:
      return {
        ...state,
        isLoading: false,
        prevAction: action.type,
        page: {
          ...state.page,
          [action.roomType]: {
            ...state.page[action.roomType],
            msgList: [...state.page[action.roomType].msgList, action.payload],
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
