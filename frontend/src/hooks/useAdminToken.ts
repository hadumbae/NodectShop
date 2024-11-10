import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function useAdminToken() {
    const navigate = useNavigate();
    const {token, isAdmin, expiresIn} = useSelector((state: any) => state.authUser);

   useEffect(() => {
       if (!isAdmin) {
           toast.error("Unauthorized.");

           if (!token) {
               navigate("/auth/login");
           }

           navigate("/");
       }
   })

    return {token, isAdmin, expiresIn};
}
