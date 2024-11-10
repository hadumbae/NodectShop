import {useDispatch, useSelector} from "react-redux";
import {expired} from "../utils/TimeUtils.ts";
import {logout} from "../state/slices/authUserSlice.ts";
import {useEffect} from "react";

interface authType {
    token: string;
    expiresIn: number;
    isAdmin: boolean;
}

/**
 * Fetches the client's auth details.
 * If the token is expired, logs the user out.
 * @returns The token, its time of expiry, and admin status.
 */
export default function useClientToken() {
    const {token, expiresIn, isAdmin}:authType  = useSelector((state: any) => state.authUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token && expiresIn) {
            if (expired(expiresIn)) {
                dispatch(logout());
            }
        }
    }, []);

    return {token, expiresIn, isAdmin};
}
