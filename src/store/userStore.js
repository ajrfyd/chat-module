const localUser = localStorage.getItem("user");
const user = JSON.parse(localUser);

const createUserStore = (reducer, ...middlewares) => {
  let state = {
    isLogin: false,
    user: {
      id: user?.id || null,
      nickName: user?.nickName || null,
      role: user?.role || "user",
      latestConnectionId: user?.latestConnectionId || null,
      latestContactTime: user?.latestContactTime || null,
      latestIp: user?.latestIp || null,
      profileImgUrl: user?.profileImgUrl || null,
      status: user?.status || null,
      updatedAt: user?.updatedAt || null,
    },
    isLoading: false,
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

export default createUserStore;
