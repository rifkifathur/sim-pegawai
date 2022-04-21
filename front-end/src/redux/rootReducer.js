import { combineReducers } from "redux";
import { pegawaiReducer } from "./pegawai/PegawaiReducer";
import { UserReducer } from "./user/UserReducer";

export const rootReducer = combineReducers ({
    user: UserReducer,
    pegawai: pegawaiReducer
})