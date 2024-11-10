import {FC} from 'react';
import {Navigate} from "react-router-dom";
import useAdminToken from "../../../hooks/useAdminToken.ts";

const LoginRedirectPage: FC = () => {
    const {isAdmin} = useAdminToken();

    return <Navigate to={isAdmin ? "/admin/dashboard" : "/user/profile"} />
};

export default LoginRedirectPage;
