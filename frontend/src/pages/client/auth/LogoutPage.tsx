import {useDispatch} from "react-redux";
import {logout} from "../../../state/slices/authUserSlice.ts";
import {Navigate} from "react-router-dom";

const LogoutPage = () => {
    const dispatch = useDispatch();
    dispatch(logout());

    return <Navigate to='/' />;
};

export default LogoutPage;
