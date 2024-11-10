import {useNavigate, useParams} from "react-router-dom";

export default function useProductSKUParam() {
    const navigate = useNavigate();
    const {productID, productSlug, skuID, skuSlug} = useParams();

    if (!productID || !skuID) {
        console.error("Invalid Product ID");
        navigate("/admin/product/list");
    }

    return {productID, productSlug, skuID, skuSlug};
}
