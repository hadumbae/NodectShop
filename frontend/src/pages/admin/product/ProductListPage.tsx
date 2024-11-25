import {FC, useEffect, useRef, useState} from 'react';
import useFetchFilteredProducts from "../../../hooks/product/filter/useFetchFilteredProducts.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import PageHeaderLink from "../../../components/navigation/page.header.link.tsx";
import HeaderText from "../../../components/header/HeaderText.tsx";
import ProductCardList from "../../../components/product/product/ProductCardList.tsx";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import Loader from "../../../components/utils/Loader.tsx";
import {FaPlus} from "react-icons/fa";

import {Input} from "@/components/ui/input.tsx";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card.tsx";
import {onMemoChange} from "@/utils/FormUtils.ts";
import ProductFilterTitleCard from "@/components/product/product/filter/product.filter.title.card.tsx";
import ProductFilterTypesAndTags from "@/components/product/product/filter/product.filter.types.tags.tsx";


const ProductListPage: FC = () => {
    const {token} = useAdminToken();

    const [page, setPage] = useState<number>(1);
    const perPage = useRef<number>(30);

    const [title, setTitle] = useState<string | undefined>(undefined);
    const [tags, setTags] = useState<string | undefined>(undefined);
    const [types, setTypes] = useState<string | undefined>(undefined);

    const queries = {
        page: page,
        perPage: perPage.current,
        title: title,
        tags: tags,
        types: types,
    };

    const {
        data,
        isPending,
        isSuccess,
        isError,
        error,
        refetch
    } = useFetchFilteredProducts(token, queries);

    useEffect(() => { refetch() }, [title, tags, types]);

    const onTypesChange = onMemoChange(setTypes);
    const onTagsChange = onMemoChange(setTags);

    if (isPending) return (<div className="flex justify-center items-center h-full">
        <Loader loading={isPending} />
    </div>);

    if (isError) {
        return (<div className="flex flex-col justify-center items-center space-y-2 h-full">
            <span className="text-red-500">Oops. Something bad happened!</span>
            <span className="text-gray-400">{error!.message}</span>
        </div>);
    }

    return (
        <div className="flex flex-col space-y-4">
            <section className="flex justify-between items-center">
                <HeaderText>Products</HeaderText>

                <PageHeaderLink link={"/admin/product/create"}>
                    <FaPlus />
                </PageHeaderLink>
            </section>

            {/* Product List */}

            <section className="grid grid-cols-4 gap-4">
                <div className="space-y-5">
                    <ProductFilterTitleCard setTitle={setTitle} />

                    <ProductFilterTypesAndTags />
                </div>

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
