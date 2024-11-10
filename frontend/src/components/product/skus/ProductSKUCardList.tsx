import {FC} from 'react';
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchProductSKUByProduct from "../../../hooks/product/useFetchProductSKUByProduct.ts";
import Loader from "../../utils/Loader.tsx";
import {Product, ProductSKU} from "../../../types/ProductTypes.ts";
import ProductSKUListCard from "./ProductSKUListCard.tsx";
import Pagination from "../../utils/pagination/Pagination.tsx";
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import _ from "lodash";

interface Props {
    product: Product;
}

const ProductSKUCardList: FC<Props> = ({product}) => {
    const {token} = useAdminToken();
    const {
        skus,
        page,
        setPage,
        perPage,
        totalItems,
        error,
        isLoading,
        refetch,
        setRefetch
    } = useFetchProductSKUByProduct(product._id, token);

    return (
        <div className="flex flex-col space-y-3">
            {isLoading && <div className="flex justify-center">
                <Loader loading={isLoading}/>
            </div>}

            {error && <div className="text-center">
                <h1 className="text-red-500 text-md">
                    Oops. Something bad happened!
                </h1>
                <h1 className="text-red-500 text-xl">
                    {error}
                </h1>
            </div>}

            {(!isLoading && !error) && <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold">SKUs</h1>
                    <Link className="border rounded-3xl p-3 hover:bg-black hover:text-white"
                          to={`/admin/product/create/${product._id}/${_.kebabCase(product.title)}/sku`}>
                        <FaPlus />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {skus.map((sku: ProductSKU) => <ProductSKUListCard
                        onDelete={() => setRefetch(!refetch)}
                        sku={sku} product={product} key={sku._id}
                    />)}
                </div>
            </div>}

            {(!isLoading && (totalItems > perPage)) &&
                <Pagination totalItems={totalItems} currentPage={page} perPage={perPage} setPage={setPage}/>}
        </div>
    );
};

export default ProductSKUCardList;
