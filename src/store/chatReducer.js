import {
  CHAT_REQUEST_START,
  SET_MESSAGE,
  SET_ROOMS,
  CHAT_REQUEST_DONE,
  SELECT_MAIN,
  SELECT_ROOM_1,
  SELECT_ROOM_2,
  CHAT_OPEN,
  CHAT_CLOSE,
  SET_ROOM1,
  SET_ROOM2,
  SET_ROOM,
} from "./chatAction.js";

const chatReducer = (state, action) => {
  switch (action.type) {
    case CHAT_REQUEST_START:
      return {
        ...state,
        isLoading: true,
      };
    case SET_ROOMS:
      return {
        ...state,
        isLoading: false,
        rooms: {
          ...state.rooms,
          room1: {
            ...state.rooms.room1,
            ...action.payload.room1,
            msgs: state.rooms.room1.msgs.concat(action.payload.room1.msgs),
          },
          room2: {
            ...state.rooms.room2,
            ...action.payload.room2,
            msgs: state.rooms.room2.msgs.concat(action.payload.room2.msgs),
          },
        },
      };
    case SET_ROOM1:
      return {
        ...state,
      };
    case SET_ROOM2:
      return {
        ...state,
      };
    case SET_ROOM:
      if (action.payload.roomType === "main") {
        return {
          ...state,
          selected: action.payload.roomType,
          isLoading: false,
        };
      }
      return {
        ...state,
        selected: action.payload.roomType,
        isLoading: false,
        rooms: {
          ...state.rooms,
          //Todo 객체에 main이 추가 되는 것을 막아 보자
          [action.payload.roomType]: {
            ...state.rooms[action.payload.roomType],
            ...action.payload.room,
          },
        },
      };
    case SET_MESSAGE:
      return {
        ...state,
        isLoading: false,
        rooms: {
          ...state.rooms,
          [action.payload.room]: {
            ...state.rooms[action.payload.room],
            msgs: state.rooms[action.payload.room].msgs.concat(
              action.payload.msg
            ),
          },
        },
      };
    case CHAT_REQUEST_DONE:
      return {
        ...state,
        isLoading: false,
      };
    case SELECT_MAIN:
      return {
        ...state,
        selected: "main",
      };
    case SELECT_ROOM_1:
      return {
        ...state,
        selected: "room1",
      };
    case SELECT_ROOM_2:
      return {
        ...state,
        selected: "room2",
      };
    case CHAT_OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case CHAT_CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default chatReducer;
