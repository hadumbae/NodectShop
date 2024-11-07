import {useNavigate, useParams} from "react-router-dom";

export default function useSupplierParam() {
    const navigate = useNavigate();
    const {supplierID, supplierSlug} = useParams();

    if (!supplierID) {
        console.error("Invalid Supplier ID");
        navigate("/admin/supplier/list");
    }

    return {supplierID, supplierSlug};
}
