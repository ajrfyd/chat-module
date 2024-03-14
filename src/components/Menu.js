import {
  appendChild,
  createEl,
  addClass,
  createMenuItem,
  qsa,
} from "../js/utils.js";
import { chatStore, store, userStore } from "../main.js";
import { selectMain, selectRoom1, selectRoom2 } from "../js/action.js";
import MenuItem from "./MenuItem.js";
import { reduce } from "fxjs";
import { socketPlugin } from "../js/socket.js";
import {
  removeChatRoom,
  menuActiveHandler,
  removeShowClass,
} from "../js/domController.js";
import { selectRoom } from "../store/chatAction.js";

class Menu {
  menus = [
    {
      name: "메 인",
      key: "main",
      fn: (key) => {
        if (!userStore.getState().isLogin) return;
        menuActiveHandler(key);
        // store.getState().user.isOpen ? null : store.dispatch(selectMain());
        chatStore.dispatch(selectRoom(key));
        removeShowClass();
        removeChatRoom(key);
      },
    },
    {
      name: "질 문",
      key: "room1",
      fn: (key) => {
        if (!userStore.getState().isLogin) return;
        menuActiveHandler(key);
        chatStore.dispatch(selectRoom(key));
        removeShowClass();
        // store.dispatch(selectRoom1());
        // socketPlugin.joinRoom(key);
        removeChatRoom(key);
      },
    },
    {
      name: "제 보",
      key: "room2",
      fn: (key) => {
        if (!userStore.getState().isLogin) return;
        menuActiveHandler(key);
        chatStore.dispatch(selectRoom(key));
        removeShowClass();
        // store.dispatch(selectRoom2());
        // socketPlugin.joinRoom(key);
        removeChatRoom(key);
      },
    },
  ];
  menuItemsHtml = "";

  constructor($target) {
    const $menu = createEl("ul");
    addClass($menu, "chat-menus");
    // addCssProperties($menu, chatMenuCss);

    this.$menu = $menu;
    this.$parent = $target;
    // this.setMenu = setMenu;
    this.createItem = (name) => new MenuItem(name).getMenuItem;
    this.init();
    this.render();
    // appendChild($target, this.$menu);
  }

  init() {
    this.menus.forEach(
      (menu) => (this.menuItemsHtml += createMenuItem(menu.name, menu.key))
    );
    this.$menu.innerHTML = this.menuItemsHtml;
    const fns = reduce(
      (acc, cur) => ({ ...acc, [cur.key]: cur.fn }),
      {},
      this.menus
    );

    for (const li of qsa("li", this.$menu)) {
      const { classList } = li;
      const [_, key] = classList.value.split(" ");
      // li.onclick = () => this.setMenu(key);
      li.onclick = () => fns[key](key);
      // addCssProperties(li, chatMenuItemCss);
    }
  }

  render() {
    appendChild(this.$parent, this.$menu);
  }
}

export default Menu;
