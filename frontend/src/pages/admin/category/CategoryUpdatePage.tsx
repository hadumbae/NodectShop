import _ from "lodash";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import {RootState} from "../../../state/store.ts";
import {useSelector} from "react-redux";
import CategoryType from "../../../types/CategoryType.ts";
import CategoryService from "../../../services/category/CategoryService.ts";

import Loader from "../../../components/utils/Loader.tsx";
import CategoryUpdateForm from "../../../components/category/CategoryUpdateForm.tsx";
import {toast} from "react-toastify";

const CategoryUpdatePage = () => {
    const navigate = useNavigate();
    const {categoryID} = useParams();

    if (!categoryID) {
        alert("Invalid category");
        navigate('/admin/category/list');
    }

    const { token, isAdmin } = useSelector((state: RootState) => state.authUser);

    if (!token) {
        alert("Unauthorized");
        navigate('/auth/login');
    }

    if (!isAdmin) {
        alert("Unauthorized");
        navigate('/');
    }

    const [category, setCategory] = useState<CategoryType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Use Effect
    useEffect(() => {
        const getCategory = async () => {
            setIsLoading(true);

            try {
                const {status, payload} = await CategoryService.fetchCategory(categoryID!, token!);

                if(status === 200) {
                    setCategory(payload.data.category);
                    setIsLoading(false);
                } else if(status === 404) {
                    toast.error(payload.message);
                    navigate('/admin/category/list');
                } else {
                    toast.error(payload.message);
                    navigate("/admin/category/list");
                }
            } catch (error) {
                alert(error);
                navigate("/admin/category/list");
            }
        }

        getCategory();
    }, [categoryID]);

    return (
        <div>
            {isLoading && <div className="flex justify-center">
                <div className="mt-52">
                    <Loader loading={isLoading}/>
                </div>
            </div>}

            {(!isLoading && category) && <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl">{category.category}</h1>
                    <Link to={`/admin/category/find/${category._id}/${_.kebabCase(category.category)}`}
                          className="text-gray-500 hover:text-black hover:underline hover:underline-offset-8 p-4 text-xl">
                        &lt; Back To Details
                    </Link>
                </div>
                <div className="mt-5">
                    <CategoryUpdateForm category={category} token={token!} />
                </div>
            </div>}
        </div>
    );
};

export default CategoryUpdatePage;
