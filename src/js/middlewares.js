const { log } = console;

export const logger = (store) => (dispatch) => (action) => {
  log("%c Prev State", "color: red", store.getState());
  log(`%c Action: >>>> ${action.type} <<<<`, "color: green");
  dispatch(action);
  log("%c Current State", "color: blue", store.getState());
};

export const compareState = (store) => (dispatch) => (action) => {
  //! 같은 액션이 반복되지 못하게
  //! 데이터 요청 같은 경우 필요 할까 고민해 보기 
  if(store.getState().prevAction === action.type) return;
  dispatch(action);
};

export const thunk = (store) => (dispatch) => (action) => typeof action === "function" ? action(dispatch, store.getState) : dispatch(action);