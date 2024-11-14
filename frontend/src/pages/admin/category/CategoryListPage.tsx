import CategoryForm from "../../../components/category/CategoryForm.tsx";
import {useEffect, useRef, useState} from "react";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchPaginatedCategories from "../../../hooks/category/useFetchPaginatedCategories.ts";
import {CategoryType} from "../../../schema/CategorySchema.ts";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import Loader from "../../../components/utils/Loader.tsx";
import CategoryListCard from "../../../components/category/CategoryListCard.tsx";

const CategoryListPgae = () => {
    const {token} = useAdminToken();
    const [page, setPage] = useState(1);
    const perPage = useRef(6);

    const {data, isLoading, error, refetch} = useFetchPaginatedCategories(page, perPage.current, token);

    useEffect(() => {
        refetch();
    }, [page])

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-5">
                <CategoryForm />
            </div>
            <div className="lg:w-1/2 p-5 flex flex-col space-y-4">
                <h1 className="text-2xl font-bold">Categories</h1>

                {isLoading && <div className="text-center">
                    <Loader loading={isLoading}/>
                </div>}

                {error && <div className="text-center text-red-500">
                    <span className="text-lg">{error.message}</span>
                </div>}

                {(!isLoading && data.categories.length === 0) && (<div className="text-center">
                    <span className="text-lg font-bold">No Categories</span>
                </div>)}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {
                        !isLoading && data.categories.map((category: CategoryType) => (<CategoryListCard key={category._id}  category={category} />))
                    }

                </div>

                {!isLoading && <div className="text-center">
                    <Pagination totalItems={data.totalItems} currentPage={page} perPage={perPage.current} setPage={setPage} />
                </div>}
            </div>
        </div>
    );
};

export default CategoryListPgae;
