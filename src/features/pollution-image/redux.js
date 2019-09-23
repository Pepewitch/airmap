import moment from "moment";

const initialState = {
  sidebar: false,
  cropPosition: {
    x: 0.5,
    y: 0.5
  },
  cropScale: 1,
  items: [
    {
      date: moment('09-23-2019'),
      levels: [10]
    }
  ]
};

const ACTION = {
  POLLUTION_IMAGE_TOGGLE_SIDEBAR: "POLLUTION_IMAGE_TOGGLE_SIDEBAR",
  POLLUTION_IMAGE_ITEM_CHANGE: "POLLUTION_IMAGE_ITEM_CHANGE",
  POLLUTION_IMAGE_ITEM_REMOVE: "POLLUTION_IMAGE_ITEM_REMOVE",
  POLLUTION_IMAGE_ITEM_ADD: "POLLUTION_IMAGE_ITEM_ADD",
  POLLUTION_IMAGE_CROP_POSITION_CHANGE: "POLLUTION_IMAGE_CROP_POSITION_CHANGE",
  POLLUTION_IMAGE_CROP_SCALE_CHANGE: "POLLUTION_IMAGE_CROP_SCALE_CHANGE"
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

export const cropPositionChangeAction = cropPosition => {
  return {
    type: ACTION.POLLUTION_IMAGE_CROP_POSITION_CHANGE,
    payload: {
      cropPosition
    }
  };
};

export const cropScaleChangeAction = cropScale => {
  return {
    type: ACTION.POLLUTION_IMAGE_CROP_SCALE_CHANGE,
    payload: {
      cropScale
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
    case ACTION.POLLUTION_IMAGE_CROP_POSITION_CHANGE:
      return { ...state, cropPosition: action.payload.cropPosition };
    case ACTION.POLLUTION_IMAGE_CROP_SCALE_CHANGE:
      return { ...state, cropScale: action.payload.cropScale };
    default:
      return state;
  }
};
