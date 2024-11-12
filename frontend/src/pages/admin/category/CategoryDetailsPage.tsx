import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

import CategoryService from "../../../services/category/CategoryService.ts";
import PageHeaderLink from "../../../components/header/PageHeaderLink.tsx";
import PageHeaderButton from "../../../components/header/PageHeaderButton.tsx";
import useCategoryParam from "../../../hooks/category/useCategoryParam.ts";
import useFetchCategoryWithData from "../../../hooks/category/useFetchCategoryWithData.ts";

const CategoryDetailsPage = () => {

    const navigate = useNavigate();

    const {token} = useSelector((state: any) => state.authUser);
    const {categoryID, categorySlug} = useCategoryParam();
    const {category, setIsLoading} = useFetchCategoryWithData(categoryID!, token);

    const deleteCategory = async () => {
        const check = confirm("Are you sure you want to delete this category?");
        if (!check) return;

        setIsLoading(true);

        try {
            const {status, payload} = await CategoryService.deleteCategory(categoryID!, token);

            if (status === 200) {
                toast.success("Category deleted successfully.");
                navigate("/admin/category/list");
            } else {
                toast.error("Something went wrong.");
                toast.error(payload.message);
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div>
            <div className="mt-5">
                <h1 className="text-3xl">{category ? category.category : "Category"}</h1>
                <div className="grid grid-cols-2 gap-2 my-5">
                    <div className="flex items-center space-x-5">
                        <PageHeaderLink
                            active={true}
                            link={`/admin/category/find/${categoryID}/${categorySlug}/details`}>
                            Details
                        </PageHeaderLink>
                        <PageHeaderLink
                            link={`/admin/category/find/${categoryID}/${categorySlug}/skus`}>
                            SKUs
                        </PageHeaderLink>
                        <PageHeaderLink
                            link={`/admin/category/find/${categoryID}/${categorySlug}/products`}>
                            Products
                        </PageHeaderLink>
                    </div>

                    {category && <div className="flex justify-end items-center">
                        <PageHeaderLink link={`/admin/category/edit/${categoryID}/${categorySlug}`}>
                            Edit
                        </PageHeaderLink>
                        <PageHeaderButton onClick={deleteCategory}>
                            Delete
                        </PageHeaderButton>
                    </div>}
                </div>

                <div className="text-center mt-5">
                    #TODO Category Statistics
                    <ol>
                        <li>Date Category Created</li>
                        <li>Total Number Of Products</li>
                        <li>Number Of Orders</li>
                    </ol>
                </div>

            </div>
        </div>);
};

export default CategoryDetailsPage;
