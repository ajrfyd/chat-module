import { getRoomsById, getRoomByType } from "../js/api";

export const CHAT_REQUEST_START = "chat_CHAT_REQUEST_START";
export const SET_ROOMS = "chat_SET_ROOMS";
export const SET_MESSAGE = "chat_SET_MESSAGE";
export const CHAT_REQUEST_DONE = "chat_CHAT_REQUEST_DONE";
export const SELECT_MAIN = "chat_SELECT_MAIN";
export const SELECT_ROOM_1 = "chat_SELECT_ROOM_1";
export const SELECT_ROOM_2 = "chat_SELECT_ROOM_2";
export const CHAT_OPEN = "chat_CHAT_OPEN";
export const CHAT_CLOSE = "chat_CHAT_CLOSE";
export const SET_ROOM1 = "chat_SET_ROOM1";
export const SET_ROOM2 = "chat_SET_ROOM2";
export const SET_ROOM = "chat_SET_ROOM";

export const request = () => ({ type: CHAT_REQUEST_START });
// export const setRooms = (rooms) => ({ type: SET_ROOMS, payload: rooms });
export const setMessage = (msg, room) => ({
  type: SET_MESSAGE,
  payload: { msg, room },
});
export const requestDone = () => ({ type: CHAT_REQUEST_DONE });

export const setRooms = (rooms) => ({ type: SET_ROOMS, payload: rooms });

export const setRoomsThunk = (id) => async (dispatch) => {
  dispatch(request());
  try {
    const { result, status } = await getRoomsById(id);
    // console.log(result, "Pre setRooms");
    // if (!result.length) return dispatch(requestDone());
    dispatch(setRooms(result));
    // Todo set Rooms & messages
  } catch (e) {
    dispatch(requestDone());
  }
};

export const selectMain = () => ({ type: SELECT_MAIN });
// export const selectRoom1 = () => ({ type: SELECT_ROOM_1 });
// export const selectRoom2 = () => ({ type: SELECT_ROOM_2 });
export const setRoom1 = (room) => ({ type: SET_ROOM1, payload: room });
export const setRoom2 = (room) => ({ type: SET_ROOM2, payload: room });
export const setRoom = (room, roomType) => ({
  type: SET_ROOM,
  payload: { room, roomType },
});
export const selectRoom = (roomType) => async (dispatch) => {
  dispatch(request());
  try {
    const { result, status } = await getRoomByType(
      roomType === "room1" ? "A" : "B"
    );
    dispatch(setRoom(result, roomType));
  } catch (e) {
    console.log(e, "Select Room Error");
    dispatch(requestDone());
  }
};

export const chatOpen = () => ({ type: CHAT_OPEN });
export const chatClose = () => ({ type: CHAT_CLOSE });
