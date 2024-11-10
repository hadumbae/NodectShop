// import {redirect} from "react-router-dom";
import {persistConfig} from "../../../state/store.ts";
import {getStoredState, purgeStoredState} from "redux-persist";
import {redirect} from "react-router-dom";
import {expired} from "../../../utils/TimeUtils.ts";
import {toast} from "react-toastify";

export default async function() {
    const state: any = await getStoredState(persistConfig);

    if (!state || !state.authUser) {
        console.error("Could not authenticate. Please try again.")
        redirect("/");
    }

    const {token, isAdmin, expiresIn} = state.authUser;

    if (!token) {
        console.error("Unauthorized!");
        return redirect("/auth/login");
    }

    if (!isAdmin) {
        console.error("Unauthorized! Not an admin!");
        return redirect("/");
    }

    if (expired(expiresIn)) {
        await purgeStoredState(persistConfig);
        toast.success("Login Expired. Please try again.");
    }

    return null;
}