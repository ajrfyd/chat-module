import { createEl, appendChild, addClass, qs
} from "../js/utils.js";
import { 
  addNickNameInput 
} from "../js/domController.js";
import Menu from "./Menu.js";
import ChatMain from "./ChatMain.js";
import Room from "./room/Room.js";
import { store } from "../main.js";

class ChatBody {
  height = 0;
  state = {};
  current = "main";

  constructor($target) {
    const $body = createEl("div");
    addClass($body, "chat-body");
    // addCssProperties($body, chatBodyCss);

    this.$body = $body;
    this.$main = new ChatMain(this.$body);
    this.$room1 = new Room(this.$body, "room1");
    this.$room2 = new Room(this.$body, "room2");
    // this.$room1 = null;
    // this.$room2 = null;
    // this.$menu = new Menu(this.$body, this.setMenu);
    
    // this.init();
    appendChild($target, this.$body);
    // this.render();
  };

  init(height, state) {
    this.state = state;
    this.height = height;
    this.$body.style.height = this.height - 60 + "px";
    store.subscribe(this.setState.bind(this));
    this.render();
  };

  // setSelectedState(data) {
  //   this.setState(data);
  // };

  setState() {
    this.state = store.getState();
    this.render();
  };

  changePageHandler() {
    // const { main , room1, room2 } = this.state;
    // const [$t] = Object.entries(this.state).filter(([k, v]) => k !== "isOpen").filter(([k, v]) => v). map(([k, _]) => k);
    // this.$main.fade(main);
    // this.$room1.fade(room1);
    // this.$room2.fade(room2);
  };

  render() {
    if(!this.state.isOpen) return;
    if(this.state.user.nickName) return;
    //! 이미 창이 열려 있는 경우 밑의 page추가될 필요 없음
    if(qs(".backdrop")) return;
    // console.log(qs(".backdrop"));
    
    //Todo this.state.user.isOpen true
    //Todo 추후 false변경 로직 필요
    if(
        this.state.isOpen && 
        !this.state.user.nickName &&
        this.state.user.isOpen
      ) {
        //Todo 닉네임 입력하는 창에서 메인으로 > del
        //Todo 계속 클릭 > html 중첩 
        addNickNameInput(this.$body);
        return;
      }
    // setTimeout(() => {
    //   removeNickNameInput(this.$body);
    // }, 1000);
    // this.changePageHandler();
    // const { main, room1, room2 } = this.state;
    // if(main) this.$main.slide();
    // if(room1) this.$room1.slide();
  };
};

export default ChatBody;