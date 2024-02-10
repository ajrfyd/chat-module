import ChatBtn from "./components/ChatBtn.js";
import "./css/main.css";
import createStore from "./js/store.js";
import reducer from "./js/reducer.js";
import { logger, thunk, compareState } from "./js/middlewares.js";

const body = parent.document.body || parent.document.documentElement;
const root = body.querySelector("#root");
!body ? console.warn("No body") : null;
export const store = createStore(reducer, thunk, compareState, logger);
// store.dispatch(getUserData());
console.log(`
  %c

██╗  ██╗██╗██████╗ 
██║  ██║██║╚════██╗
███████║██║  ▄███╔╝
██╔══██║██║  ▀▀══╝ 
██║  ██║██║  ██╗   
╚═╝  ╚═╝╚═╝  ╚═╝   
`, "color: purple");
body && root ? new ChatBtn(root) : console.warn("No root!")