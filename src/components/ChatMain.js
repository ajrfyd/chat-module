import {
  createEl,
  appendChild,
  addCssProperties,
  addClass,
} from "../js/utils.js";
import { store, chatStore, userStore } from "../main.js";

class ChatMain {
  state = {};
  constructor($target) {
    const $main = createEl("section");
    addClass($main, "chat-main");
    addClass($main, "chat-room");
    this.$main = $main;

    this.init();
    appendChild($target, this.$main);
  }

  fade(state) {
    // if(state) {
    //   this.$main.classList.add("show");
    // } else {
    //   this.$main.classList.remove("show");
    // }
  }

  init() {
    this.state = chatStore.getState();
    // if (userStore.getState().user.role === "user") {
    this.$main.innerHTML = `
        <h1>Welcome!</h1>
        <p>안녕하세요. 블로그 주인입니다:)</p>
        <p>이곳은 질문 혹은 제보를 위해 만들어 졌습니다.</p>
        <p>포스팅에 대한 궁금증은 질문 탭</p>
        <p>버그에 대한 제보는 제보 탭</p>
        <p>많은 관심 부탁 드립니다.</p>
        <br/>
        <p>현재 테스트 중입니다.</p>
        <p>메세지 전송은 가능합니다.</p>
        <p>답장은 구현 중입니다.</p>
      `;
    // }

    chatStore.subscribe(this.setState.bind(this));
  }

  setState() {
    // const { selected: prev } = this.state;
    const prevMain = this.$main.classList.contains("show");
    const nextState = chatStore.getState();
    // console.log(prev, nextState.selected, "asdjkaghfgjka");
    //* 이전 메인 상태와 다름 상태가 같으면
    //* 같은 버튼을 클릭하고 있다.
    if (prevMain) return;
    // if (prev === nextState.selected) return;
    this.state = nextState;

    //! render x
    // 이전과 같은 상태일 경우
    // 오픈, 메인 오픈, && 이전 오픈과 메인 오픈

    // 오픈, 메뉴 안오픈, 나머지 오픈 리턴
    //
    // console.log("%cMainPage Render", "color: purple");

    this.render();
  }

  render() {
    //! render x
    // 이전과 같은 상태일 경우
    // 오픈, 메인 오픈, && 이전 오픈과 메인 오픈

    // 오픈, 메뉴 안오픈, 나머지 오픈 리턴
    //
    const { isOpen, selected } = this.state;
    // console.log(isOpen, selected, " !!@!!!#213");
    // const { isOpen: main } = this.state.page.main;
    if (!isOpen) return this.$main.classList.remove("show");
    if (selected !== "main") return this.$main.classList.remove("show");
    //! render o
    // prev !open && open, main open
    // 오픈, 메뉴 오픈
    if (selected === "main") this.$main.classList.add("show");
    // (this.state.isOpen && this.state.page.main) ?
    // this.$main.classList.add("show") :
    // this.$main.classList.remove("show");
  }
}

export default ChatMain;
