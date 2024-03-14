const localUser = localStorage.getItem("user");
const user = JSON.parse(localUser);

const createChatStore = (reducer, ...middlewares) => {
  let state = {
    isOpen: false,
    isLoading: false,
    selected: "main",
    rooms: {
      room1: {
        roomId: "",
        roomName: "",
        roomDesc: "",
        imgUrl: "",
        refId: "",
        userLimit: "",
        currentState: "",
        roomType: "",
        purposeType: "",
        enterPassword: "",
        deleteUserId: "",
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        ownerId: "",
        msgs: [],
      },
      room2: {
        roomId: "",
        roomName: "",
        roomDesc: "",
        imgUrl: "",
        refId: "",
        userLimit: "",
        currentState: "",
        roomType: "",
        purposeType: "",
        enterPassword: "",
        deleteUserId: "",
        createdAt: "",
        updatedAt: "",
        deletedAt: "",
        ownerId: "",
        msgs: [],
      },
    },
  };

  const listener = [];

  const getState = () => ({ ...state });
  const dispatch = (action) => {
    state = reducer(state, action);
    // listener.forEach(f => f());
    publish();
  };

  const publish = () => listener.forEach((fn) => fn());

  const subscribe = (f) => listener.push(f);

  const store = {
    dispatch,
    getState,
    subscribe,
  };

  let wrapper = store.dispatch;
  middlewares = Array.from(middlewares).reverse();
  middlewares.forEach((middleware) => (wrapper = middleware(store)(wrapper)));

  return {
    getState,
    dispatch: wrapper,
    subscribe,
  };
};

export default createChatStore;
