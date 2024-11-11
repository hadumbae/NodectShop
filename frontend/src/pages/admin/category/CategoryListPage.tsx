import CategoryCreateForm from "../../../components/category/CategoryCreateForm.tsx";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import ListTable from "../../../components/utils/ListTable.tsx";

import CategoryService from "../../../services/category/CategoryService.ts";
import {CategoryListAccessors} from "../../../utils/CategoryListTableAccessors.tsx";

const CategoryListPgae = () => {
    const {token} = useSelector((state: any) => state.authUser);

    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState([]);

    // @ts-ignore
    const [perPage, setPerPage] = useState(15);
    // @ts-ignore
    const [refetch, setRefetch] = useState(false);

    const accessors = useRef(CategoryListAccessors);

    useEffect(() => {
        fetchData();
    }, [page, perPage])

    const fetchData = async () => {
        try {
            const {status, payload} = await CategoryService.fetchPaginatedCategories(page, perPage, token);
            if (status != 200) return toast.error("Error! Please Try Again!");

            setTotalCount(payload.data.totalItems);
            setCategories(payload.data.categories);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-row">
            <div className="w-1/2 p-5">
                <CategoryCreateForm />
            </div>
            <div className="w-1/2 p-5">
                <div className="bg-white shadow-md rounded p-5">
                    <div className="flex flex-row justify-between items-center mb-5">
                        <div>
                            <h1 className="text-xl font-bold mb-2">Category</h1>
                            <p>List of categories with a count of their products.</p>
                        </div>
                        <div>
                            <select
                                name="perPage"
                                id="perPage"
                                value={perPage}
                                className="p-2 shadow-md bg-white border"
                                onChange={(e) => setPerPage(parseInt(e.target.value))}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>

                    <ListTable accessors={accessors.current} data={categories} />
                    <div className="mt-3">
                        <Pagination totalItems={totalCount} currentPage={page} perPage={perPage} setPage={setPage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryListPgae;
