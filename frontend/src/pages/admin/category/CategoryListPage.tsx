import CategoryForm from "../../../components/category/CategoryForm.tsx";
import {useEffect, useRef, useState} from "react";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import ListTable from "../../../components/utils/ListTable.tsx";

import {CategoryListAccessors} from "../../../utils/CategoryListTableAccessors.tsx";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchPaginatedCategories from "../../../hooks/category/useFetchPaginatedCategories.ts";
import Loader from "../../../components/utils/Loader.tsx";

const CategoryListPgae = () => {
    const {token} = useAdminToken();
    const [page, setPage] = useState(1);

    const {data, isLoading, error, refetch} = useFetchPaginatedCategories(page, 15, token);

    const accessors = useRef(CategoryListAccessors);

    useEffect(() => {
        refetch();
    }, [page])

    return (
        <div className="flex flex-row">
            <div className="w-1/2 p-5">
                <CategoryForm />
            </div>
            <div className="w-1/2 p-5">
                {
                    (isLoading || error) ?
                        <div className="mt-5 flex justify-center">
                            <div className="flex flex-col items-center p-5 space-y-5">
                                <Loader loading={isLoading} />
                                {
                                    error && <span className="text-red-500">
                                        {error.message ? error.message : `Oops. Something bad happened!`}
                                    </span>
                                }
                            </div>
                        </div> :
                        <div className="bg-white shadow-md rounded p-5">
                            <h1 className="text-xl font-bold mb-2">Category</h1>
                            <p>List of categories with a count of their products.</p>

                            <ListTable accessors={accessors.current} data={data.categories} />
                            <div className="mt-3">
                                {
                                    data.totalItems > 15 && <Pagination totalItems={data.totalItems} currentPage={page} perPage={15} setPage={setPage} />
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default CategoryListPgae;
