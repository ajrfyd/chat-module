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
import { store, userStore } from "../main.js";
import { setUserData } from "./action.js";
import { signUp, signHandler } from "./api.js";
import { setUser } from "../store/userActions.js";

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
        maxLength="30"
        minLength="3"
      />
      <input 
        type="password" 
        class="password-input" 
        placeholder="비밀번호를 입력해 주세요." 
        maxLength="100" 
        minLength="4"
        autoComplete="false"
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
  // qs(".nickname-btn", backdrop).removeEventListener(
  //   "click",
  //   nickNameSubmitHandler
  // );
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
  // socketPlugin.exitRoom(roomName);
  room.remove();
};

export const paintMsg = (key, data) => {
  const $target = qs(`.contents.${key}`);
  // console.log(qs(`.contents.${key}`), "!!!!!!!!!!")
  console.log("paint!!!");
  const { id } = userStore.getState().user;
  const msgStr = `
    <div class="chat-content-body ${
      id === data.createUserId && data.msgType !== "A" ? "me" : ""
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

const selectHandler = (e, type) => {
  const clicked =
    type === "l" ? qs(".select-btn.login") : qs(".select-btn.regist");
  const nonClicked =
    type === "l" ? qs(".select-btn.regist") : qs(".select-btn.login");
  if (clicked.classList.contains("active")) {
    clicked.type = "submit";
    nonClicked.type = "button";
  } else {
    clicked.type = "button";
    clicked.classList.toggle("active");
    nonClicked.type = "submit";
    nonClicked.classList.toggle("active");
  }
  // e.target 에 active 있는지 확인
  // 있다면 서브밋 버튼이다
  // const selectedYet = e.target.classList.contains("active");
  // if (selectHandler) {
  // e.target.type = "submit";
  // return;
  // }
  // console.log(selectedYet);
  // 없다면 바꿔줘라
  // const not = qs(".select-btn:not(.active)");
  // not.type = "submit";
  // const btns = qsa(".select-btn");
  // btns.forEach((btn) => {
  //   btn.classList.toggle("active");
  //   btn.type === "button" ? (btn.type = "submit") : (btn.type = "button");
  // });
};

const onSignUpHandler = async (e) => {
  e.preventDefault();
  const $nickName = qs(".nickname-input");
  const $password = qs(".password-input");
  const nickName = $nickName.value;
  const password = $password.value;

  if (nickName === "") return invalidHandler($nickName, "빈값 입니다.");
  if (password === "") return invalidHandler($password, "빈값 입니다.");
  if (nickName.length < 3) return invalidHandler($target, "최소 세글자....");
  if (password.length < 4) return invalidHandler($target, "최소 네글자....");

  const type = qs(".select-btn.active").classList.contains("login")
    ? "login"
    : "signup";
  try {
    const { result, status } = await signHandler(nickName, password, type);

    if (status === 200 || status === 201) {
      localStorage.setItem("nickName", result.nickName);
      localStorage.setItem("user", JSON.stringify(result));
      // store.dispatch(setUserData(result));
      userStore.dispatch(setUser(result));
      removeNickNameInput();
      return;
    }
    // if (status !== 201 || status !== 200) {
    invalidHandler(
      qs(".backdrop .nickname-input"),
      type === "login"
        ? "로그인 정보가 정확하지 않습니다."
        : "이미 존재하는 닉네임 입니다."
    );
    // return;
    // }
  } catch (e) {
    console.log(e.name);
    console.log(e.message);
    console.log(e, "???????");
  }
  // socketPlugin.createNickName(value);
};

export const addSignupForm = ($target) => {
  const backdrop = createEl("div");
  addClass(backdrop, "backdrop");

  backdrop.innerHTML = `
    <form class="backdrop-body">
      <input 
        type="text" 
        class="nickname-input" 
        placeholder="닉네임을 입력해 주세요."
        maxLength="30"
        minLength="3"
      />
      <input 
        type="password" 
        class="password-input" 
        placeholder="비밀번호를 입력해 주세요." 
        maxLength="100" 
        minLength="4"
        autoComplete="false"
      />
      <div class="select-btn-container">
        <button type="submit" class="select-btn regist active">등 록</button>
        <button type="button" class="select-btn login">로그인</button>
      </div>
    </form>
  `;

  // qs(".nickname-btn", backdrop).addEventListener(
  //   "click",
  //   nickNameSubmitHandler
  // );
  // qs(".nickname-input", backdrop).addEventListener("keydown", enterCatcher);

  appendChild($target, backdrop);
  qs(".backdrop-body").onsubmit = onSignUpHandler;
  qs(".select-btn.regist").onclick = (e) => selectHandler(e, "r");
  qs(".select-btn.login").onclick = (e) => selectHandler(e, "l");
};

export const removeShowClass = () => {
  qsa(".chat-room").forEach((r) => r.classList.remove("show"));
};

export const paintAlert = (el) => {
  console.log(el);
  const alert = createEl("span");
  addClass(alert, "btn-alert");
  appendChild(el, alert);
};

export const removeAlert = () => {};
