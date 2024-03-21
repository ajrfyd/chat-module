import {
  createEl,
  appendChild,
  addClass,
  qs,
  removeChild,
} from "../js/utils.js";
import ChatContainer from "./ChatContainer.js";
import { store, chatStore } from "../main.js";
// import { chatClose, chatOpen } from "../js/action.js";
import { menuActiveHandler, removeAlert } from "../js/domController.js";
import { chatOpen, chatClose } from "../store/chatAction.js";

class ChatBtn {
  parent = null;
  state = store.getState();

  constructor($target) {
    const btn = createEl("div");
    addClass(btn, "chat-btn");
    // addCssProperties(btn, chatBtnCss);

    this.$parent = $target;
    this.$btn = btn;

    this.$btn.onclick = () => {
      this.toggle();
    };

    // this.$iframe = new Iframe(this.$parent);
    this.$chatContainer = new ChatContainer(this.$parent);

    appendChild($target, this.$btn);
    this.init();
    // this.render();
  }

  toggle() {
    // !this.state.isOpen
    //   ? store.dispatch(chatOpen())
    //   : store.dispatch(chatClose());
    // menuActiveHandler("main");
    !this.state.isOpen
      ? chatStore.dispatch(chatOpen())
      : chatStore.dispatch(chatClose());
    menuActiveHandler("main");

    if (this.state.isOpen) {
      const alert = qs(".btn-alert");
      if (alert) removeAlert(this.$btn, alert);
    }
    // this.isOpened = !this.isOpened;
    // this.$chatContainer.fade(this.isOpened);
    // this.render();
  }

  init() {
    // store.subscribe(this.setState.bind(this));
    chatStore.subscribe(this.setState.bind(this));
  }

  setState() {
    // const nextState = store.getState();
    const nextState = chatStore.getState();
    this.state = nextState;
    this.render();
  }

  render() {
    // this.isOpened ? this.$btn.classList.add("active") : this.$btn.classList.remove("active");
    this.state.isOpen
      ? this.$btn.classList.add("active")
      : this.$btn.classList.remove("active");
  }
}

export default ChatBtn;
