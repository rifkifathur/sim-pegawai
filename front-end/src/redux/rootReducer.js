import { combineReducers } from "redux";
import { pegawaiReducer } from "./pegawai/PegawaiReducer";
import { UserReducer } from "./user/UserReducer";
import { showSideNavReducer } from "./showSideNav/showSideNavReducer";

export const rootReducer = combineReducers ({
    user: UserReducer,
    pegawai: pegawaiReducer,
    showSideNav: showSideNavReducer
})