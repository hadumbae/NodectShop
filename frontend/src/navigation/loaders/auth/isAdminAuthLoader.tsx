// import {redirect} from "react-router-dom";
import {store} from "../../../state/store.ts";

export default function() {
    const token = store.getState().authUser.token;
    const isAdmin = store.getState().authUser.isAdmin;

    console.log("Token ", token);
    console.log("isAdmin ", isAdmin);

    // if (!token) {
    //     console.error("Unauthorized!");
    //     return redirect("/auth/login");
    // }
    //
    // if (!isAdmin) {
    //     console.error("Unauthorized!");
    //     return redirect("/");
    // }

    return null;
}