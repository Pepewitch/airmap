const initialState = {
  width: window.innerWidth
};

export const ACTION = {
  SCREEN_SIZE_SUBSCRIBE: "SCREEN_SIZE_SUBSCRIBE"
};

export const screenSizeSubscribeAction = width => {
  return {
    type: ACTION.SCREEN_SIZE_SUBSCRIBE,
    payload: width
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SCREEN_SIZE_SUBSCRIBE:
      return { ...state, width: action.payload };
    default:
      return state;
  }
};
