import moment from "moment";

const initialState = {
  sidebar: false,
  items: [
    {
      date: moment(),
      levels: [10,20,30,40]
    }
  ]
};

const ACTION = {
  POLLUTION_IMAGE_TOGGLE_SIDEBAR: "POLLUTION_IMAGE_TOGGLE_SIDEBAR",
  POLLUTION_IMAGE_ITEM_CHANGE: "POLLUTION_IMAGE_ITEM_CHANGE",
  POLLUTION_IMAGE_ITEM_REMOVE: "POLLUTION_IMAGE_ITEM_REMOVE",
  POLLUTION_IMAGE_ITEM_ADD: "POLLUTION_IMAGE_ITEM_ADD"
};

export const toggleSidebarAction = () => {
  return {
    type: ACTION.POLLUTION_IMAGE_TOGGLE_SIDEBAR
  };
};

export const itemChangeAction = (item, index) => {
  return {
    type: ACTION.POLLUTION_IMAGE_ITEM_CHANGE,
    payload: {
      index,
      item
    }
  };
};

export const itemRemoveAction = (item, index) => {
  return {
    type: ACTION.POLLUTION_IMAGE_ITEM_REMOVE,
    payload: {
      index,
      item
    }
  };
};

export const itemAddAction = () => {
  return {
    type: ACTION.POLLUTION_IMAGE_ITEM_ADD,
    payload: {
      date: null,
      levels: []
    }
  };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.POLLUTION_IMAGE_TOGGLE_SIDEBAR:
      return { ...state, sidebar: !state.sidebar };
    case ACTION.POLLUTION_IMAGE_ITEM_CHANGE: {
      state.items.splice(action.payload.index, 1, action.payload.item);
      return { ...state, items: [...state.items] };
    }
    case ACTION.POLLUTION_IMAGE_ITEM_REMOVE: {
      state.items.splice(action.payload.index, 1);
      return { ...state, items: [...state.items] };
    }
    case ACTION.POLLUTION_IMAGE_ITEM_ADD:
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};
