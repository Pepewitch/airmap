import moment from "moment";
import { TYPE, NOT_SPECIFIC_LEVEL } from "./const";

const initialState = {
  sidebar: false,
  dimension: "2D",
  cropPosition: {
    x: 0.5,
    y: 0.5
  },
  cropScale: 1,
  items: [
    {
      startDate: moment(),
      endDate: moment(),
      type: TYPE["1H1GALL"],
      level: NOT_SPECIFIC_LEVEL
    }
  ]
};

const ACTION = {
  POLLUTION_IMAGE_TOGGLE_SIDEBAR: "POLLUTION_IMAGE_TOGGLE_SIDEBAR",
  POLLUTION_IMAGE_ITEM_CHANGE: "POLLUTION_IMAGE_ITEM_CHANGE",
  POLLUTION_IMAGE_ITEM_REMOVE: "POLLUTION_IMAGE_ITEM_REMOVE",
  POLLUTION_IMAGE_ITEM_ADD: "POLLUTION_IMAGE_ITEM_ADD",
  POLLUTION_IMAGE_CROP_POSITION_CHANGE: "POLLUTION_IMAGE_CROP_POSITION_CHANGE",
  POLLUTION_IMAGE_CROP_SCALE_CHANGE: "POLLUTION_IMAGE_CROP_SCALE_CHANGE",
  POLLUTION_IMAGE_DIMENSION_CHANGE: "POLLUTION_IMAGE_DIMENSION_CHANGE"
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
      level: 0
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

export const dimensionChangeAction = dimension => {
  return {
    type: ACTION.POLLUTION_IMAGE_DIMENSION_CHANGE,
    payload: { dimension }
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
    case ACTION.POLLUTION_IMAGE_DIMENSION_CHANGE:
      return { ...state, dimension: action.payload.dimension };
    default:
      return state;
  }
};
