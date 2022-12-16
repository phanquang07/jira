import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducer/userReducer";

const rootReducer = combineReducers({ userReducer })

export const store = createStore(rootReducer, applyMiddleware(thunk))