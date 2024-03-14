import ChatBtn from "/src/components/ChatBtn";
import "/src/css/main.css";
import createStore from "/src/js/store.js";
import reducer from "/src/js/reducer.js";
import { logger, thunk, compareState } from "/src/js/middlewares.js";
import createUserStore from "./store/userStore.js";
import userReducer from "./store/userReducer.js";
import createChatStore from "./store/chatStore.js";
import chatReducer from "./store/chatReducer.js";

const body = parent.document.body || parent.document.documentElement;
const root = body.querySelector("#root");
!body ? console.warn("No body") : null;
export const store = createStore(reducer, thunk, compareState, logger);
export const userStore = createUserStore(userReducer, thunk, logger);
export const chatStore = createChatStore(chatReducer, thunk, logger);
// store.dispatch(getUserData());
console.log(
  `
  %c

██╗  ██╗██╗██████╗ 
██║  ██║██║╚════██╗
███████║██║  ▄███╔╝
██╔══██║██║  ▀▀══╝ 
██║  ██║██║  ██╗   
╚═╝  ╚═╝╚═╝  ╚═╝   
`,
  "color: purple"
);

body && root ? new ChatBtn(root) : console.warn("No root!");
