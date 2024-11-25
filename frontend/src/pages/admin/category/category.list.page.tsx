import {useEffect, useRef, useState} from "react";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchPaginatedCategories from "../../../hooks/category/useFetchPaginatedCategories.ts";
import {ZCategory} from "@/schema/category.validate.schema.ts";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import Loader from "../../../components/utils/Loader.tsx";
import CategoryListCard from "../../../components/category/CategoryListCard.tsx";
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/page.header.link.tsx";
import {FaPlus} from "react-icons/fa";

import {isMobile} from "react-device-detect";

const CategoryListPage = () => {
    const {token} = useAdminToken();
    const [page, setPage] = useState(1);
    const perPage = useRef(isMobile ? 6 : 12);

    const {data, isPending, isSuccess, error, refetch} = useFetchPaginatedCategories(page, perPage.current, token);

    useEffect(() => {
        refetch();
    }, [page])

    if (isPending) return (<div className="flex justify-center items-center h-full">
        <Loader loading={isPending} />
    </div>);

    return (
        <div className="h-full flex flex-col space-y-5">
            <section className="flex justify-between items-center">
                <HeaderText className="text-2xl font-bold">Categories</HeaderText>
                <PageHeaderLink link="/admin/category/create">
                    <FaPlus />
                </PageHeaderLink>
            </section>

            {(isSuccess && data.categories.length === 0) && <section className="flex-1 flex justify-center items-center">
                <span className="text-gray-500">There are no categories.</span>
            </section>}

            {isSuccess && <section className="space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {data.categories.map((category: ZCategory) => <div key={category._id}>
                        <CategoryListCard category={category}/>
                    </div>)}
                </div>
            </section>}

            {(isSuccess && data.toalItems > perPage) && <Pagination totalItems={data.totalItems} currentPage={page} perPage={perPage.current} setPage={setPage}/>}
        </div>
    );
};

export default CategoryListPage;
