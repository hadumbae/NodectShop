import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

import CategoryService from "../../../services/category/category.admin.service.ts";
import useCategoryParam from "../../../hooks/category/useCategoryParam.ts";
import useFetchCategoryWithData from "../../../hooks/category/useFetchCategoryWithData.ts";
import {FaPencil} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import IconButtonLink from "../../../components/navigation/IconButtonLink.tsx";
import IconButton from "../../../components/navigation/IconButton.tsx";
import CategoryProductDetailsCard from "../../../components/category/CategoryProductDetailsCard.tsx";

const CategoryDetailsPage = () => {

    const navigate = useNavigate();

    const {token} = useSelector((state: any) => state.authUser);
    const {categoryID, categorySlug} = useCategoryParam();
    const {category, products, setIsLoading} = useFetchCategoryWithData(categoryID!, token);

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
            <div className="mt-5 flex flex-col space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <h1 className="text-3xl">{category ? category.category : "Category"}</h1>
                    {category && <div className="flex justify-center space-x-4 lg:justify-end items-center">
                        <IconButtonLink className="text-gray-400 hover:text-blue-600 hover:border-blue-600"
                            to={`/admin/category/edit/${categoryID}/${categorySlug}`}>
                            <FaPencil />
                        </IconButtonLink>
                        <IconButton onClick={deleteCategory} className="text-gray-400 hover:text-red-600 hover:border-red-600">
                            <FaTrash />
                        </IconButton>
                    </div>}
                </div>

                <div className="text-center">
                    #TODO Category Statistics
                    <ol>
                        <li>Date Category Created</li>
                        <li>Total Number Of Products</li>
                        <li>Number Of Orders</li>
                    </ol>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-10">
                    <div className="flex flex-col space-y-3">
                        <h1 className="text-2xl font-semibold">Products</h1>
                        {products.map((product:any) => <CategoryProductDetailsCard key={product._id} product={product}/>)}
                    </div>
                    <div className="bg-blue-500">B</div>
                </div>
            </div>
        </div>);
};

export default CategoryDetailsPage;
