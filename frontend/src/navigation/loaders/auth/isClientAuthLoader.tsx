import {redirect} from "react-router-dom";
import {store} from "../../../state/store.ts";

export default function () {
    const token= store.getState().authUser.token;
    console.log(token);

    if (!token) return redirect("/auth/login");
    return null;
}