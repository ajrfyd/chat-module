const createStore = (reducer, ...middlewares) => {
  let state = {
    isOpen: false,
    page: {
      main: {
        isOpen: false,
      },
      room1: {
        isOpen: false,
        msgList: []
      },
      room2: {
        isOpen: false,
        msgList: []
      },
    },
    user: {
      isOpen: false,
      role: "user",
      nickName: null,
      socketId: null,
      id: null
    },
    isLoading: false,
    prevAction: "",
  };

  const listener = [];

  const getState = () => ({ ...state });
  const dispatch = (action) => {
    state = reducer(state, action);
    // listener.forEach(f => f());
    publish();
  };

  const publish = () => listener.forEach(fn => fn());
  
  const subscribe = (f) => listener.push(f);
  
  const store = {
    dispatch,
    getState,
    subscribe
  };

  let wrapper = store.dispatch;
  middlewares = Array.from(middlewares).reverse();
  middlewares.forEach(middleware => wrapper = middleware(store)(wrapper));

  return {
    getState,
    dispatch: wrapper,
    subscribe
  };
};

export default createStore;