import {useEffect, useRef, useState} from "react";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchPaginatedCategories from "../../../hooks/category/useFetchPaginatedCategories.ts";
import {CategoryType} from "@/schema/CategorySchema.ts";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import Loader from "../../../components/utils/Loader.tsx";
import CategoryListCard from "../../../components/category/CategoryListCard.tsx";
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/PageHeaderLink.tsx";
import {FaPlus} from "react-icons/fa";

import {isMobile} from "react-device-detect";

const CategoryListPgae = () => {
    const {token} = useAdminToken();
    const [page, setPage] = useState(1);
    const perPage = useRef(isMobile ? 6 : 12);

    const {data, isLoading, error, refetch} = useFetchPaginatedCategories(page, perPage.current, token);

    useEffect(() => {
        refetch();
    }, [page])

    return (
        <div className="md:p-5 space-y-5">
            <section className="flex justify-between items-center">
                <HeaderText className="text-2xl font-bold">Categories</HeaderText>
                <PageHeaderLink link="/admin/category/create">
                    <FaPlus />
                </PageHeaderLink>
            </section>

            {isLoading && <section className="flex justify-center">
                <div className="flex flex-col items-center space-y-10">
                    <Loader loading={isLoading} />

                    {error && <span className="text-red-500">
                        Oops. Something bad happened!
                    </span>}
                </div>
            </section>}

            {(data && !error) && <section className="space-y-5">
                <div className="grid grid-cols-1 px-0 sm:grid-cols-2 sm:px-10  xl:grid-cols-3 xl:px-20 gap-4">
                    {data.categories.map((category: CategoryType) => <div key={category._id}>
                        <CategoryListCard category={category}/>
                    </div>)}
                </div>

                <Pagination totalItems={data.totalItems} currentPage={page} perPage={perPage.current} setPage={setPage}/>
            </section>}
        </div>
    );
};

export default CategoryListPgae;
