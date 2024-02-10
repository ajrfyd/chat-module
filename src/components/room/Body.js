import { addClass, appendChild, createEl,
  makeStrHtml, makeStrToEl, qs, qsa, getLocalItem
} from "../../js/utils.js";
import { go, each } from "fxjs";
import { store } from "../../main.js";
import { SET_MSGS } from "../../js/action.js";

class Body {
  state = {};
  prevMsgList = [];

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
  };

  chatMaker(msgs) {
    const { id } = store.getState().user;
    return `
      <div class="contents ${msgs[0].roomType === 'A' ? 'room1' : 'room2'}">
        ${
          makeStrHtml(msg => `
            <div class="chat-content-body ${(id === msg.create_user_id && !!msg.msgType) ? "" : (id === msg.create_user_id && !msg.msgType) ? "me" : ""} ${msg.msgType === "A" ? 'entered' : ''}">
              <p class="chat-content">
                ${msg.msg}
              </p>
            </div>
          `
          , msgs)
        }
      </div>
    `;
  };

  init() {
    store.subscribe(this.setState.bind(this));
  };

  open() {
    const nickName = getLocalItem("nickName");

    console.log(this.roomName, "open!");
  };

  close() {
    console.log(this.roomName, "close");
  };

  setState() {
    const nextState = store.getState();
    if(!nextState.page[this.roomName].isOpen) return;
    const contents = qs(`.contents.${this.roomName}`);
    if(contents) return;
    // Todo 같은 탭 누르면 중복 요청 피해야 한다.
    // Todo 스토어의 변경으로인한 3번 랜더링 막아야 함.
    // if(nextState.isLoading) return;
    if(nextState.page[this.roomName].isOpen && nextState.page[this.roomName].msgList.length >= 1) {
      this.state = nextState;
      this.prevMsgList =  this.state.page[this.roomName].msgList;
      this.render();
    };
  };

  render() {
    //! 페이드 아웃시 자식관계 끊은 후 다른배열에 저장 ?
    //^ init, open, room1 총 세번의 랜더링
    const room = this.state.page[this.roomName];
    // if(this.state.isOpen) {
    //   // this.open();
    //   go(
    //     this.state.msgList,
    //     this.chatMaker,
    //     makeStrToEl,
    //     appendChild(qs(`.room-body.${this.roomName}`))
    //   );
    // } else {
    //   // this.close();
    //   !qs(`.room-body.${this.roomName}`) ? null : qs(`.room-body.${this.roomName}`).innerHTML = "";
    // }
    go(
      room.msgList,
      this.chatMaker,
      makeStrToEl,
      appendChild(qs(`.room-body.${this.roomName}`))
    );
  };
};

export default Body;