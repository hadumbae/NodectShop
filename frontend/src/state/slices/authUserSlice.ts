import { createSlice } from "@reduxjs/toolkit";

interface AuthUserState {
    token: string | null;
    isAdmin: boolean;
    expiresIn: number | null;
}

const initialState: AuthUserState = {token: null, isAdmin: false, expiresIn: null};

export const authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.isAdmin = action.payload.isAdmin;
            state.expiresIn = action.payload.expiresIn;
        },
        logout: (state) => {
            state.token = null;
            state.isAdmin = false;
            state.expiresIn = null;
        }
    }
})

export const {login, logout} = authUserSlice.actions;

export default authUserSlice.reducer;