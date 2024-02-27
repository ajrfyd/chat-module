// import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
import { io } from "socket.io-client";
import { qs } from "./utils.js";
import { store } from "../main.js";
import { requestStart, setUserData, initUserInfo, setMsgs } from "./action.js";
import {
  removeNickNameInput,
  invalidHandler,
  paintMsg,
} from "../js/domController.js";
const { log } = console;
// const socket = io("http://localhost:8088", { transports: ["websocket"] });

// export const socket1 = io("http://localhost:8088/room1", { transports: ["websocket"] });
// export const socket2 = io("http://localhost:8088/room2", { transports: ["websocket"] });

// const socketHandler = (roomName) => io(`http://localhost:8088/${roomName}`, { transports: ["websocket"] });
const socketHandler = (roomName) =>
  io(`https://chat.hkound.pe.kr/${roomName}`, { transports: ["websocket"] });

export const socketPlugin = {};

window.onload = (e) => {
  const nickName = localStorage.getItem("nickName");
  // const socket = io("https://chat.hkound.pe.kr",
  const socket = io("http://localhost:8088", {
    transports: ["websocket"],
    auth: {
      nickName,
    },
  });

  //! if(nickName) socketId update
  socket.on("first-connect", (res) => {
    // log(res.msg);
    log(res);
    store.dispatch(
      initUserInfo({
        socketId: socket.id,
        nickName,
        id: res.id,
        role: res.role,
      })
    );
    // if(nickName) store.dispatch(updateSocketId(socket.id));
  });

  socket.on("not-exist-user", (msg) => {
    // log(msg);
    localStorage.clear();
    store.dispatch(initUserInfo({ socketId: socket.id, nickName: null }));
  });

  socket.on("joined-room", (data) => {
    // console.log(data);
    const msgList = data.msgList;
    store.dispatch(
      setMsgs({ roomType: data.roomType === "A" ? "room1" : "room2", msgList })
    );
  });

  //! Add plugin
  socketPlugin.createNickName = (name) => {
    //! loading
    store.dispatch(requestStart());
    socket.emit("create-nickname", name);
    socket.on("nickname-exist", () =>
      invalidHandler(
        qs(".backdrop .nickname-input"),
        "이미 존재하는 닉네임 입니다."
      )
    );
    socket.on("nickname-created", (data) => {
      store.dispatch(setUserData(data));
      localStorage.setItem("nickName", data.nick_name);
      removeNickNameInput();
      socket.off("nickname-exist", () =>
        invalidHandler(
          qs(".backdrop .nickname-input"),
          "이미 존재하는 닉네임 입니다."
        )
      );
    });
  };
  socketPlugin.existHandler = () => {
    const input = qs(".nickname-input");
    input.value = "";
    input.placeholder = "이미 존재하는 닉네임 입니다.";
    input.classList.add("invalid");
    setTimeout(() => input.focus(), 1000);
    return false;
  };
  socketPlugin.sendMsg = (key, $input) => {
    const { value } = $input;
    const { user } = store.getState();
    socket.emit(key, {
      socketId: user.socketId,
      msg: value,
      nickName: user.nickName,
      roomType: key === "room1" ? "A" : "B",
    });
    socket.on(`send-msg-success ${key}`, (data) => paintMsg(key, data));
    // console.log("sendMsgsgsgsgs", key);
  };
  socketPlugin.joinRoom = (roomName) => {
    store.dispatch(requestStart());
    const roomInfo = getRoomInfo(roomName);
    socket.emit("join-room", roomInfo);
  };
  socketPlugin.exitRoom = (roomName) => {
    const roomInfo = getRoomInfo(roomName);
    socket.emit("exit-room", roomInfo);
  };
  socketPlugin.roomHandler = (roomName, type) => {
    const roomInfo = getRoomInfo(roomName);
    socket.emit(`${type}-room`, roomInfo);
  };
};

const getRoomInfo = (roomName) => {
  const roomType = roomName === "room1" ? "A" : "B";
  const { user } = store.getState();
  return {
    nickName: user.nickName,
    socketId: user.socketId,
    roomType,
  };
};

// export const createNickName = (name) => {
//   socket.emit("create-nickname", name);
// };

export default socketHandler;
