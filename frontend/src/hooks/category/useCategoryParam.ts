import {useNavigate, useParams} from "react-router-dom";

export default function useCategoryParam() {
    const navigate = useNavigate();
    const {categoryID, categorySlug} = useParams();

    if (!categoryID) {
        console.error("Invalid Category ID");
        navigate("/admin/category/list");
    }

    return {categoryID, categorySlug};
}
