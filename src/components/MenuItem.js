import { createEl, addCssProperties, addClass } from "../js/utils.js";
import { store } from "../main.js";

//* deprecated
class MenuItem {
  acitive = false; 
  state = {};

  constructor(name) {
    const $li = createEl("li");
    this.name = name;
    $li.addClass("menu-item");
    // addCssProperties($li, chatMenuItemCss);

    $li.innerHTML = `${this.name}`;
    this.$li = $li;
    this.init();
    // this.render();

  };
  
  init() {
    this.state = store.getState();
    store.subscribe(this.setState.bind(this));
  };

  setState() {
    const nextState = store.getState();
    this.state = nextState;
    this.render();
  };

  get getMenuItem() {
    return this.$li;
  };

  activeHandler() {
    this.$li.calssList.add("active");
  };

  render() {
    console.log("hello")
  };
};

export default MenuItem;