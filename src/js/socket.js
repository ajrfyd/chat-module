import { io } from "socket.io-client";
import { qs } from "./utils.js";
import { store } from "../main.js";
import { paintMsg, paintAlert, paintAlertForNav } from "../js/domController.js";
import { chatStore, userStore } from "../main.js";
import { setRoomsThunk, setMessage, requestDone } from "../store/chatAction.js";
import { setLogin } from "../store/userActions.js";
import { endPoint } from "./constants.js";
const { log } = console;

const socketHandler = (roomName) =>
  io(`https://chat.hkound.pe.kr/${roomName}`, { transports: ["websocket"] });

export const socketPlugin = {};

export let socket = null;

const getRoomInfo = (roomName) => {
  const roomType = roomName === "room1" ? "A" : "B";
  const { user } = store.getState();
  return {
    nickName: user.nickName,
    socketId: user.socketId,
    roomType,
  };
};

window.onload = (e) => {
  const nickName = localStorage.getItem("nickName");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (user) {
    userStore.dispatch(setLogin());
    chatStore.dispatch(setRoomsThunk(user.id));

    socket = io(endPoint, {
      transports: ["websocket"],
      auth: {
        nickName,
      },
    });

    socket.on("newMsg", (msg, roomId) => {
      const { dispatch, getState } = chatStore;
      const {
        rooms: { room1, room2 },
        isOpen,
        selected,
      } = getState();
      const targetObj = [room1, room2].filter((room) => room.roomId === roomId);
      if (!targetObj.length) return dispatch(requestDone());
      const target = targetObj[0].purposeType === "A" ? "room1" : "room2";
      dispatch(setMessage(msg, target));

      //* new msg alert for btn
      if (!isOpen) paintAlert(qs(".chat-btn"));

      //^ nav-alert
      //Todo 방에 들어와 있는 상태로 내가 보낸 메세지에는 표시 ㄴㄴ
      const navAlert = qs(`.menu-item.${target} .nav-alert`);
      if (!navAlert && target !== selected)
        paintAlertForNav(qs(`.menu-item.${target}`));
      //& 채팅 방에 들어 가기 전에는 .contents가 없다.
      if (!qs(".contents")) return;
      paintMsg(target, msg);
    });
  }
  // if (qs(".menu-item.room1")) {

  // }
  // paintAlert(qs(".chat-btn"));
};

export default socketHandler;
