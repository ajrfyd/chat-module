import ChatBtn from "/src/components/ChatBtn.js";
import "/src/css/main.css";
import createStore from "/src/js/store.js";
import reducer from "/src/js/reducer.js";
import { logger, thunk, compareState } from "/src/js/middlewares.js";

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