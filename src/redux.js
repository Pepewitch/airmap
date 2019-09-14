import { combineReducers } from "redux";
import { reducer as pollution } from "./features/pollution-image/redux.js";

export const rootReducer = combineReducers({ pollution });
