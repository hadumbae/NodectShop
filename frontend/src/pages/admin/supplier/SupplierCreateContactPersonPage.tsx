import {FC} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

const SupplierCreateContactPersonPage: FC = () => {
    const navigate = useNavigate();
    const {supplierID} = useParams();

    if (!supplierID) {
        toast.error("Invalid Supplier ID");
        navigate("/admin/supplier/list");
    }

    const {token , isAdmin} = useSelector((state: any) => state.authUser);

    if (!token) {
        toast.error("Unauthorized!");
        if (!isAdmin) navigate("/");
        navigate("/auth/login")
    }

    return (
        <div>
            SupplierCreateContactPersonPage
        </div>
    );
};

export default SupplierCreateContactPersonPage;
