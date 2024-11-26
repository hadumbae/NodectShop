import {FC, useEffect, useRef, useState} from 'react';
import useFetchFilteredProducts from "../../../hooks/product/filter/useFetchFilteredProducts.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import PageHeaderLink from "../../../components/navigation/page.header.link.tsx";
import HeaderText from "../../../components/header/HeaderText.tsx";
import ProductCardList from "../../../components/product/product/ProductCardList.tsx";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import {FaPlus} from "react-icons/fa";

import PageLoader from "@/components/utils/PageLoader.tsx";
import PageError from "@/components/utils/PageError.tsx";
import ProductFilterList from "@/components/product/product/filter/product.filter.list.tsx";


const ProductListPage: FC = () => {
    const {token} = useAdminToken();

    const [page, setPage] = useState<number>(1);
    const perPage = useRef<number>(30);

    const [title, setTitle] = useState<string | undefined>(undefined);
    const [tags, setTags] = useState<string | undefined>(undefined);
    const [types, setTypes] = useState<string | undefined>(undefined);
    const [hasSKU, setHasSKU] = useState<string | undefined>(undefined);

    const queries = {
        page: page,
        perPage: perPage.current,
        title: title,
        tags: tags,
        types: types,
        hasSKU: hasSKU
    };

    const {
        data,
        isPending,
        isSuccess,
        isError,
        error,
        refetch
    } = useFetchFilteredProducts(token, queries);

    useEffect(() => { refetch() }, [title, tags, types, hasSKU]);

    if (isPending) return <PageLoader />;

    if (isError) return <PageError message={error!.message} />;

    return (
        <div className="flex flex-col space-y-4">
            <section className="flex justify-between items-center">
                <HeaderText>Products</HeaderText>

                <PageHeaderLink link={"/admin/product/create"}>
                    <FaPlus />
                </PageHeaderLink>
            </section>

            {/* Product List */}

            <section className="grid grid-cols-1 md:grid-cols-4 md:gap-4 max-sm:space-y-4">
                <ProductFilterList
                    setTitle={setTitle}
                    setHasSKU={setHasSKU}
                    setTags={setTags}
                    setTypes={setTypes}
                />

                <div className="col-span-3">
                    {isSuccess && <ProductCardList products={data.products} />}
                </div>
            </section>

            {/* Pagination */}

            {(!isPending && data.totalItems > perPage) && <section>
                <Pagination totalItems={data.totalItems} currentPage={page} perPage={perPage.current} setPage={setPage}/>
            </section>}
        </div>
    );
};

export default ProductListPage;
