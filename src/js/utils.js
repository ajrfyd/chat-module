import { curry, go, map, filter, pipe, reduce, reject } from "fxjs";
import { getUserInfo, sendMsgApi } from "./api.js";
import { socketPugin } from "./socket.js";
import { chatStore } from "../main.js";

export const createEl = (tag) => document.createElement(tag);
export const appendChild = curry((parent, child) => parent.appendChild(child));
export const removeChild = (parent, child) => parent.removeChild(child);
export const addClass = (target, className, ...name) =>
  target.classList.add(className, ...name);
export const rmClass = (target, className) =>
  target.calssList.remove(className);
export const addId = (target, id) => target.setAttribute("id", id);
export const addCssProperties = (target, properties) =>
  Object.entries(properties).forEach(([k, v]) =>
    target.style.setProperty(k, v)
  );
export const createMenuItem = (menuName, key, fn) =>
  `<li class="menu-item ${key}">${menuName}</li>`;
export const setMenuState = (menus, key) =>
  Object.entries(menus)
    .map(([k, _]) => [k, false])
    .reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: k === key || k === "isOpen" ? true : false,
      }),
      {}
    );
export const getLocalItem = (key) => JSON.parse(localStorage.getItem("key"));

const add = (a, b) => a + b;

export const qs = (sel, parent = document) => parent.querySelector(sel);
export const qsa = (sel, parent = document) => parent.querySelectorAll(sel);

export const join = (iter, sep = ",") =>
  reduce((acc, cur) => `${acc}${sep}${cur}`, iter);

export const makeStrToEl = (html) => {
  const parent = createEl("div");
  parent.innerHTML = html;
  return parent.children[0];
};

export const makeStrHtml = curry(pipe(map, reduce(add)));

export const appendElFromArr = pipe(map, makeStrHtml);

export const getUserDataMok = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ nickName: "ajrfyd", role: "admin" }), 100)
  );

export const removeClassAll = (iter, className) =>
  go(
    iter,
    map((el) => el.classList.remove(className))
  );
export const getExitRoom = (iter, className) =>
  go(
    iter,
    reject((c) => c === className),
    ([a]) => a
  );

export const scrollToBottom = ($target) =>
  $target.scrollTo(0, $target.scrollHeight);

export const createAtHandler = (date) => {
  if (!date) return;
  return new Intl.DateTimeFormat("ko-kr", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
};

export const sendMsg = async (msg) => {
  const { isOpen, selected, rooms } = chatStore.getState();
  if (!isOpen) return;
  return await sendMsgApi({ msg, roomId: rooms[selected].roomId });
};
