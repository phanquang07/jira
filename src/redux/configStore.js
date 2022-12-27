import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { loginReducer } from './reducer/loginReducer'
import { projectCategoryReducer } from "./reducer/projectCategoryReducer";
import { projectReducer } from "./reducer/projectReducer";

const rootReducer = combineReducers({ loginReducer, projectReducer, projectCategoryReducer })

export const store = createStore(rootReducer, applyMiddleware(thunk))