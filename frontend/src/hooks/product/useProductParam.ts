import {useNavigate, useParams} from "react-router-dom";

export default function useProductParam() {
    const navigate = useNavigate();
    const {productID, productSlug} = useParams();

    if (!productID) {
        console.error("Invalid Product ID");
        navigate("/admin/product/list");
    }

    return {productID, productSlug};
}
