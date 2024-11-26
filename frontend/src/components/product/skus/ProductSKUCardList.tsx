import {FC, useRef, useState} from 'react';
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchProductSKUByProduct from "../../../hooks/product/useFetchProductSKUByProduct.ts";
import ProductSKUListCard from "./ProductSKUListCard.tsx";
import Pagination from "../../utils/pagination/Pagination.tsx";
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import _ from "lodash";

import {Product, ProductSKU} from "@/types/ProductTypes.ts";
import PageLoader from "@/components/utils/PageLoader.tsx";
import PageError from "@/components/utils/PageError.tsx";

interface Props {
    product: Product;
}

const ProductSKUCardList: FC<Props> = ({product}) => {
    const {token} = useAdminToken();
    const [page, setPage] = useState<number>(1);
    const perPage = useRef<number>(15);

    const {data, isPending, isSuccess, isError, error, refetch} = useFetchProductSKUByProduct(product._id, page, perPage.current, token);

    if (isPending) return <PageLoader />
    if (isError) return <PageError message={error!.message} />

    return (
        <div className="flex flex-col space-y-3">
            <section className="flex justify-between items-center">
                <h1 className="text-xl font-bold">SKUs</h1>

                <Link className="border rounded-3xl p-2 hover:bg-black hover:text-white"
                      to={`/admin/product/create/${product._id}/${_.kebabCase(product.title)}/sku`}>
                    <FaPlus />
                </Link>
            </section>

            {isSuccess && <section className="space-y-3">
                {
                    data.skus.map((sku: ProductSKU) =>
                        <ProductSKUListCard
                            onDelete={refetch}
                            sku={sku}
                            product={product}
                            key={sku._id}
                        />)
                }

                {
                    (data.totalItems > perPage) &&
                        <Pagination
                            totalItems={data.totalItems}
                            currentPage={page}
                            perPage={perPage.current}
                            setPage={setPage}/>
                }
            </section>}
        </div>
    );
};

export default ProductSKUCardList;
