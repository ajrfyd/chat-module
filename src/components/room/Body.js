import {
  addClass,
  appendChild,
  createEl,
  makeStrHtml,
  makeStrToEl,
  qs,
  getLocalItem,
  scrollToBottom,
} from "../../js/utils.js";
import { go, each } from "fxjs";
import { store, chatStore, userStore } from "../../main.js";
import { SET_MSGS } from "../../js/action.js";
import { createAtHandler } from "../../js/utils.js";

class Body {
  state = {};
  prevMsgList = [];
  msgList = [];

  constructor($target, roomName) {
    const $body = createEl("section");
    addClass($body, "room-body", roomName);
    this.roomName = roomName;
    this.$body = $body;
    this.$parent = $target;
    // this.socket = socketHandler(this.roomName);

    this.init();
    appendChild($target, this.$body);
    // this.render();
  }

  chatMaker(msgs) {
    const { id } = userStore.getState().user;
    const { selected } = chatStore.getState();
    return `
      <div class="contents ${selected}">
        ${makeStrHtml(
          (msg) => `
            <div class="chat-content-body ${
              id === msg.createUserId && msg.msgType !== "A" ? "me" : ""
            } ${msg.msgType === "A" ? "entered" : ""}">
              <p class="chat-content">
                ${msg.msg}
              </p>
              <span class="createdAt">
                ${createAtHandler(msg.createdAt) || createAtHandler(Date.now())}
              </span>
            </div>
          `,
          msgs
        )}
      </div>
    `;
  }

  init() {
    chatStore.subscribe(this.setState.bind(this));
  }

  open() {
    // console.log(this.roomName, "open!");
  }

  close() {
    // console.log(this.roomName, "close");
  }

  setState() {
    const { isOpen, selected } = chatStore.getState();
    if (!isOpen || selected !== this.roomName) return;
    const nextState = chatStore.getState();
    // const contents = qs(`.contents.${this.roomName}`);
    // if (contents) return;
    if (this.msgList.length === nextState.rooms[this.roomName].msgs.length) {
      this.render();
      return;
    }
    // Todo 같은 탭 누르면 중복 요청 피해야 한다.
    // Todo 스토어의 변경으로인한 3번 랜더링 막아야 함.
    // if(nextState.isLoading) return;

    this.state = nextState;
    this.msgList = nextState.rooms[this.roomName].msgs;
    this.render();
    // if (
    //   nextState.page[this.roomName].isOpen &&
    //   nextState.page[this.roomName].msgList.length >= 1
    // ) {
    //   this.state = nextState;
    //   this.prevMsgList = this.state.page[this.roomName].msgList;
    //   this.render();
    // }
  }

  render() {
    //! 페이드 아웃시 자식관계 끊은 후 다른배열에 저장 ?
    //^ init, open, room1 총 세번의 랜더링
    console.log(`%c${this.roomName} render!!`, "color: pink");
    const contents = qs(`.contents.${this.roomName}`);
    if (contents) return;
    go(
      this.msgList,
      this.chatMaker,
      makeStrToEl,
      appendChild(qs(`.room-body.${this.roomName}`))
    );
    scrollToBottom(qs(`.contents.${this.roomName}`));
  }
}

export default Body;
