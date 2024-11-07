import {useNavigate, useParams} from "react-router-dom";

export default function useSupplierContactPersonParam() {
    const navigate = useNavigate();
    const {supplierID, supplierSlug, contactID, contactSlug} = useParams();

    if (!supplierID || !contactID) {
        console.error("Invalid Supplier ID Or Contact ID");
        navigate("/admin/supplier/list");
    }

    return {supplierID, supplierSlug, contactID, contactSlug};
}
