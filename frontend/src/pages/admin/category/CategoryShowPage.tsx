import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import _ from "lodash";

import Loader from "../../../components/utils/Loader.tsx";
import FormToggle from "../../../components/inputs/FormToggle.tsx";
import ListTable from "../../../components/utils/ListTable.tsx";

import CategoryService from "../../../services/category/CategoryService.ts";
import TableAccessorType from "../../../types/TableAccessorType.ts";
import CategoryType from "../../../types/CategoryType.ts";
import {CategoryProductAccessors, CategoryProductSKUAccessors} from "../../../utils/CategoryListTableAccessors.tsx";

const CategoryShowPage = () => {

    const navigate = useNavigate();

    const {token} = useSelector((state: any) => state.authUser);
    const {categoryID} = useParams();

    if (!categoryID) {
        toast.error("Category ID Missing.");
        setTimeout(() => navigate("/admin/category/list"), 5000);
    }

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [category, setCategory] = useState<CategoryType | null>(null);
    const [products, setProducts] = useState([]);
    const [skus, setSKUs] = useState([]);
    const [tableToggle, setTableToggle] = useState(false);

    const productAccessors = useRef<TableAccessorType[]>(CategoryProductAccessors);
    const skuAccessors = useRef<TableAccessorType[]>(CategoryProductSKUAccessors);

    useEffect(() => {
        setIsLoading(true);
        fetchCategory();
    }, []);

    const fetchCategory = async () => {
        try {
            const {status, payload} = await CategoryService.fetchCategoryWithData(categoryID!, token);

            if (status === 200) {
                setCategory(payload.data.category);
                setProducts(payload.data.products);
                setSKUs(payload.data.skus);

                setIsLoading(false);
            } else {
                alert(payload.message);
                navigate("/admin/category/list");
            }
        } catch (error) {
            alert(error);
        }
    }

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
            {isLoading && <div className="flex justify-center">
                <div className="mt-52">
                    <Loader loading={isLoading}/>
                </div>
            </div>}

            {(!isLoading && category) && <div>
                <div className="py-5 flex justify-between items-center">
                    <h1 className="text-3xl">{category.category}</h1>


                    <div className="flex space-x-4">
                        <span className={tableToggle ? "text-gray-400 font-bold" : ""}>SKUs</span>
                        <FormToggle isChecked={tableToggle} setIsChecked={setTableToggle}/>
                        <span className={tableToggle ? "" : "text-gray-400 font-bold"}>Products</span>
                    </div>


                    <div className="flex items-center">
                        <Link to="/admin/category/list"
                              className="text-gray-500 hover:text-black hover:underline hover:underline-offset-8 p-4 text-xl">
                            &lt; Index
                        </Link>
                        <Link to={`/admin/category/edit/${category._id}/${_.kebabCase(category.category)}`}
                              className="text-gray-500 hover:text-blue-500 hover:underline hover:underline-offset-8 p-4 text-xl">
                            Edit
                        </Link>
                        <button onClick={deleteCategory}
                              className="text-gray-500 hover:text-red-500 hover:underline hover:underline-offset-8 p-4 text-xl">
                            Delete
                        </button>
                    </div>
                </div>

                {tableToggle && <div className="bg-white shadow-md border rounded-lg p-4">
                    <h1 className="text-xl">Products</h1>
                    <ListTable accessors={productAccessors.current} data={products} />
                </div>}

                {!tableToggle && <div className="bg-white shadow-md border rounded-lg p-4">
                    <h1 className="text-xl">SKUs</h1>
                    <ListTable accessors={skuAccessors.current} data={skus} />
                </div>}

                <div className="text-center mt-5">
                    #TODO Category Statistics
                    <ol>
                        <li>Date Category Created</li>
                        <li>Total Number Of Products</li>
                        <li>Number Of Orders</li>
                    </ol>
                </div>

            </div>}
        </div>);
};

export default CategoryShowPage;
