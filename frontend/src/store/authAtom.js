import { atom } from "recoil";

export const authAtom = atom({
    key: "authAtom",   // unique id
    default: {
        isAuthenticated: false,
        user: null,
    },
});