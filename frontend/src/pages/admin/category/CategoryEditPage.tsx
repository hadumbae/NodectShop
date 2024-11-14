import _ from "lodash";
import {Link} from "react-router-dom";

import Loader from "../../../components/utils/Loader.tsx";
import CategoryForm from "../../../components/category/CategoryForm.tsx";
import useCategoryParam from "../../../hooks/category/useCategoryParam.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchCategoryWithData from "../../../hooks/category/useFetchCategoryWithData.ts";

const CategoryEditPage = () => {
    const {categoryID} = useCategoryParam();

    const { token } = useAdminToken();
    const {category, isLoading} = useFetchCategoryWithData(categoryID!, token);

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
                    <Link to={`/admin/category/find/${category._id}/${_.kebabCase(category.category)}/details`}
                          className="text-gray-500 hover:text-black hover:underline hover:underline-offset-8 p-4 text-xl">
                        &lt; Details
                    </Link>
                </div>
                <div className="mt-5 flex justify-center">
                    <div className="w-full lg:w-1/2">
                        <CategoryForm category={category} />
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default CategoryEditPage;
