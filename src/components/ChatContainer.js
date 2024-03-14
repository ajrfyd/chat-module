import {
  createEl,
  appendChild,
  addCssProperties,
  addClass,
  addId,
  setMenuState,
} from "../js/utils.js";
import ChatBody from "./ChatBody.js";
import Menu from "./Menu.js";
import { store, chatStore } from "../main.js";

class ChatContainer {
  // state = {
  //   isOpen: false,
  //   main: true,
  //   room1: false,
  //   room2: false
  // };
  width = 400;
  height = 700;

  state = {};

  constructor($target) {
    const $container = createEl("main");
    // this.fade = (isOpen) => {
    //   this.isOpen = isOpen;
    //   // this.render();
    //   this.setState({
    //     ...this.state,
    //     isOpen,
    //   });
    // };

    this.$parent = $target;
    this.$container = $container;
    this.$body = new ChatBody($container);
    this.$menu = new Menu(this.$container);

    this.init();

    appendChild($target, this.$container);
  }

  init() {
    addClass(this.$container, "chat-container");
    addId(this.$container, "chat-container");
    const { clientWidth, clientHeight } = this.$parent;

    this.width = clientWidth >= this.width ? this.width : clientWidth - 20;
    this.height = clientHeight >= this.height ? this.height : this.height - 100;

    //* 바디의 높이 초기화
    this.$body.init(this.height, this.state);
    //* 랜더링 시 최초 상태
    // this.setChildState();
    addCssProperties(this.$container, {
      width: this.width + "px",
      height: this.height + "px",
    });
    // store.subscribe(this.setState.bind(this));
    chatStore.subscribe(this.setState.bind(this));
  }

  fadeIn() {
    // addCssProperties(this.$container, fadeInContainerCss);
    this.$container.classList.add("show");
  }

  fadeOut() {
    // addCssProperties(this.$container, fadeOutContainerCss);
    this.$container.classList.remove("show");
  }

  setState() {
    const nextState = chatStore.getState();
    this.state = nextState;
    //* 최적화 state의 isOpen 상태에서만 fade 할 수 있도록 수정????
    //* 전 상태와 후 상태 비교 해서
    this.render();
  }

  render() {
    this.state.isOpen ? this.fadeIn() : this.fadeOut();
  }
}

export default ChatContainer;

//* Deprecated
// setMenu = (key) => {
//   const selected = setMenuState(this.state, key);
//   // console.log(key);

//   //* childrend 상태 전달
//   this.$body.setSelectedState(selected);
//   this.setState(selected);
// };

//* Deprecated
// setState(nextState) {
//   const { isOpen: prevIsOpenState } = this.state;
//   this.state = nextState;
//   this.render(prevIsOpenState);
// };
//* Deprecated
// render(prevIsOpenState) {
//   // if(!prevIsOpenState === this.state.isOpen) {
//   //   this.isOpen ? this.fadeIn() : this.fadeOut();
//   // };
// };
