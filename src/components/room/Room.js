import { appendChild, createEl, addClass } from "../../js/utils.js";
import Title from "./Title.js";
import Body from "./Body.js";
import InputSection from "./InputSection.js";
import { store, chatStore } from "../../main.js";
import { socket } from "../../js/socket.js";
import { setMessage } from "../../store/chatAction.js";

class Room {
  // state = {
  //   isOpen: false,
  //   name: null,
  //   type: 'user',
  //   tobeClose: false,
  // };
  state = {};

  constructor($target, roomName) {
    const $room = createEl("div");
    addClass($room, "chat-room", roomName);
    // addCssProperties($room, chatRoomCss);

    this.$room = $room;
    this.$parent = $target;
    this.roomName = roomName;
    this.title = this.roomName === "room1" ? "질문하기" : "버그제보";
    this.$title = new Title(this.$room, this.title);
    this.$body = new Body(this.$room, this.roomName);
    this.$inputSection = new InputSection(this.$room, this.roomName);

    this.init();
    appendChild($target, this.$room);
  }

  init() {
    // this.test = store.getState();
    // this.state = store.getState();
    this.state = chatStore.getState();
    chatStore.subscribe(this.setState.bind(this));

    // socket.on("newMsg", (msg) => {
    //   chatStore.dispatch(setMessage(msg, this.roomName));
    // });
    // this.roomName === "room1" ? this.$room.style.right = "200px" : this.$room.style.right = "0";
  }

  fade(state) {
    if (state) {
      const nextState = {
        ...this.state,
        isOpen: state,
        name: this.roomName,
        tobeClose: true,
      };

      //! 대화내용 가져와 상태 저장
      // this.roomName === "room1" ? socket1.on("connect", console.log) : socket2.on("connect", console.log);
      // this.socket.emit(`${this.roomName} entered`, `${this.roomName} 접속`);
      // this.socket.on(`${this.roomName} init`, this.test);

      this.$room.classList.add("show");
      this.setState(nextState);
    } else {
      //! 소켓 해제
      if (!state && this.state.tobeClose) {
        // console.log("close", this.roomName);
        // this.socket.emit(`${this.roomName} leave`, `${this.roomName} leave`);
        // this.socket.off(`${this.roomName} init`, this.test);
      }
      this.$room.classList.remove("show");
      this.setState({
        ...this.state,
        isOpen: state,
        tobeClose: false,
      });
    }
  }

  fadeIn() {
    this.$room.classList.add("show");
  }

  fadeOut() {
    this.$room.classList.remove("show");
  }

  setState() {
    const nextState = chatStore.getState();
    // if(!nextState.page[this.roomName].isOpen) return;
    this.state = nextState;
    this.render();
  }

  render() {
    // this.state.page[this.roomName].isOpen
    this.state.selected === this.roomName
      ? this.$room.classList.add("show")
      : this.$room.classList.remove("show");
  }
}

export default Room;
