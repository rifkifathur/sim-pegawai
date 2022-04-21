import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
// import { pegawaiReducer } from "./pegawai/PegawaiReducer";
import { rootReducer } from "./rootReducer";

export const store = createStore(rootReducer, applyMiddleware(thunk))