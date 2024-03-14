import { userStore } from "../main.js";
import { setLogout } from "../store/userActions.js";

const url = "https://chat.hkound.pe.kr";
// export const url = "http://localhost:5000";

export const getUserInfo = async (nickName) =>
  await fetch(`${url}/user/search/${nickName}`)
    .then((res) => res.json())
    .catch((e) => console.log(e, "ajahjahah"));

export const sendMsgApi = async (newMsg) => {
  return await fetch(`${url}/api/chat/send`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(newMsg),
  }).then((res) => res.json());
};

export const signUp = async (nickName, password) => {
  return await fetch(`${url}/api/auth/signup`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickName,
      password,
      confirmPassword: password,
    }),
  }).then((res) => res.json());
};

export const signHandler = async (nickName, password, type) => {
  return await fetch(`${url}/api/auth/${type}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      nickName,
      password,
      confirmPassword: password,
    }),
  }).then((res) => res.json());
};

export const findOrCreateRoom = async (id) => {
  return await fetch(`${url}/api/chat/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getRooms = async (id) => {
  return await fetch(`${url}/api/chat/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const getRoomsById = async (id) => {
  return await fetch(`${url}/api/room`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => (console.log(res), res))
    .then((res) => res.json())
    .then((result) => {
      if (result.message !== "ok") {
        localStorage.clear();
        userStore.dispatch(setLogout());
      }
      return result;
    })
    .catch((e) => console.log(e, "ajnhshdjdmdm"));
};

export const getRoomByType = async (roomType) => {
  return await fetch(`${url}/api/room/${roomType}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());
};
