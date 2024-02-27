import { appendChild, addClass, createEl } from "../../js/utils.js";
import { store } from "../../main.js";
import { setMsg } from "../../js/action.js";
import { paintMsg } from "../../js/domController.js";
import { url } from "../../js/api.js";
import { sendMsg } from "../../js/api.js";

class InputSection {
  constructor($target, roomName) {
    const $wrapper = createEl("section");
    const $input = createEl("input");
    const $btn = createEl("button");
    addClass($wrapper, "input-section", roomName);
    addClass($input, "insert-input", roomName);
    addClass($btn, "submit-btn", roomName);
    $input.type = "text";
    $input.maxLength = 100;
    $btn.type = "button";
    $btn.innerText = "입 력";

    this.roomName = roomName;
    this.$wrapper = $wrapper;
    this.$input = $input;
    this.$btn = $btn;

    this.init();
    appendChild(this.$wrapper, this.$input);
    appendChild(this.$wrapper, this.$btn);
    appendChild($target, this.$wrapper);
  }

  init() {
    this.$input.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      this.$btn.onclick();
    });

    this.$btn.onclick = async () => {
      if (this.$input.value.length < 1)
        return (
          this.$input.classList.add("invalid"),
          (this.$input.placeholder = "공백입니다."),
          setTimeout(() => this.$input.focus(), 1000)
        );
      if (this.$input.value.length >= 1) this.$input.placeholder = "";

      const { value } = this.$input;
      const { user } = store.getState();

      const newMsg = {
        socketId: user.socketId,
        msg: value,
        nickName: user.nickName,
        roomType: this.roomName === "room1" ? "A" : "B",
      };

      const result = await sendMsg(newMsg);
      const { message, result: newMessage } = result;
      if (message !== "ok") return alert(message);
      paintMsg(this.roomName, newMessage);
      store.dispatch(setMsg(newMessage, this.roomName));
      this.$input.value = "";
      this.$input.focus();
    };
  }
}

export default InputSection;
