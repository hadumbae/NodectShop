import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function useAdminToken() {
    const navigate = useNavigate();
    const {token, isAdmin} = useSelector((state: any) => state.authUser);

    if (!isAdmin) {
        toast.error("Unauthorized.");
        if (!token) {
            navigate("/auth/login");
        }
        navigate("/");
    }

    return {token, isAdmin};
}
