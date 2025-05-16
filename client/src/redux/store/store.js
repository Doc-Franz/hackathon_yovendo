import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";

const rootReducer = combineReducers({
  login: loginReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
