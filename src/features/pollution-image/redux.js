const initialState = {
  sidebar: false
};

const ACTION = {
  POLLUTION_IMAGE_TOGGLE_SIDEBAR: "POLLUTION_IMAGE_TOGGLE_SIDEBAR"
};

export const toggleSidebarAction = () => {
  return {
    type: ACTION.POLLUTION_IMAGE_TOGGLE_SIDEBAR
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.POLLUTION_IMAGE_TOGGLE_SIDEBAR:
      return { ...state, sidebar: !state.sidebar };
    default:
      return state;
  }
};
