import { combineReducers } from "redux";
import { reducer as pollution } from "./features/pollution-image/redux.js";
import { reducer as screenSize } from "./features/screen-size/redux";

export const rootReducer = combineReducers({ pollution, screenSize });
