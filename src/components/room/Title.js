import {  appendChild, createEl } from "../../js/utils.js";

class Title {
  constructor($target, title) {
    const $title = createEl("h1");
    $title.innerText = title;
    this.$title = $title;
    appendChild($target, this.$title);
  };
};

export default Title;