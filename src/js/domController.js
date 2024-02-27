import {
  createEl,
  addClass,
  qs,
  qsa,
  appendChild,
  removeClassAll,
  getExitRoom,
  makeStrToEl,
  scrollToBottom,
  createAtHandler,
} from "./utils.js";
import { socketPlugin } from "./socket.js";
import { store } from "../main.js";

export const menuActiveHandler = (key) => {
  const menus = qsa(".menu-item");
  removeClassAll(menus, "active");
  qs(`.menu-item.${key}`).classList.add("active");
};

export const addNickNameInput = ($target) => {
  const backdrop = createEl("div");
  addClass(backdrop, "backdrop");

  backdrop.innerHTML = `
    <div class="backdrop-body">
      <input 
        type="text" 
        class="nickname-input" 
        placeholder="채팅에 사용할 닉네임을 정해 주세요."
        maxlength="30"
        minlength="3"
      />
      <button class="nickname-btn">등 록</button>
    </div>
  `;

  qs(".nickname-btn", backdrop).addEventListener(
    "click",
    nickNameSubmitHandler
  );
  qs(".nickname-input", backdrop).addEventListener("keydown", enterCatcher);

  appendChild($target, backdrop);
};

const nickNameSubmitHandler = () => {
  const $target = qs(".nickname-input");

  const value = $target.value;
  if (value === "") return invalidHandler($target, "빈값 입니다.");
  if (value.length < 3) return invalidHandler($target, "최소 세글자....");
  socketPlugin.createNickName(value);
  // removeNickNameInput();
};

const enterCatcher = async (e) => {
  if (e.key !== "Enter") return;
  nickNameSubmitHandler();

  // if(e.target.value === "") return emptyHandler(e.target);
  // const user = await getUserInfo(e.target.value);
  // createNickName(e.target.value);

  // console.log(user);
  // removeNickNameInput(e.target, ".backdrop");
};

export const invalidHandler = ($target, text) => {
  $target.placeholder = text;
  $target.value = "";
  $target.classList.add("invalid");
};

export const removeNickNameInput = () => {
  const backdrop = qs(".backdrop");
  if (!backdrop) return;
  qs(".nickname-btn", backdrop).removeEventListener(
    "click",
    nickNameSubmitHandler
  );
  qs(".nickname-input", backdrop).removeEventListener("keydown", enterCatcher);
  qs(".backdrop").remove();
};

export const removeChatRoom = (key) => {
  // Todo exist room 처리
  let room = null;
  if (key === "main") {
    const rooms = qsa(".contents");
    if (rooms.length) room = rooms[0];
  } else room = qs(`.contents.${key === "room1" ? "room2" : "room1"}`);
  if (!room) return;
  const roomName = getExitRoom(room.classList, "contents");
  socketPlugin.exitRoom(roomName);
  room.remove();
};

export const paintMsg = (key, data) => {
  const $target = qs(`.contents.${key}`);
  // console.log(qs(`.contents.${key}`), "!!!!!!!!!!")
  const { id } = store.getState().user;
  const msgStr = `
    <div class="chat-content-body ${
      id === data.create_user_id && !!data.msgType
        ? ""
        : id === data.create_user_id && !data.msgType
        ? "me"
        : ""
    } ${data.msgType === "A" ? "entered" : ""}">
      <p class="chat-content">
        ${data.msg}
      </p>
      <span class="createdAt">${createAtHandler(data.createdAt)}</span>
    </div>
  `;
  const msg = makeStrToEl(msgStr);
  appendChild($target, msg);
  scrollToBottom($target);
  return;
};
