import { createSlice } from "@reduxjs/toolkit";

interface AuthUserState {
    token: string | null;
    isAdmin: boolean;
}

const initialState: AuthUserState = {token: null, isAdmin: false};

export const authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.isAdmin = action.payload.isAdmin;
        },
        logout: (state) => {
            state.token = null;
            state.isAdmin = false;
        }
    }
})

export const {login, logout} = authUserSlice.actions;

export default authUserSlice.reducer;