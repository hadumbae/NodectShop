import {FC, useEffect, useState} from 'react';
import useAdminToken from "../../../hooks/useAdminToken.ts";
import {toast} from "react-toastify";
import SupplierService from "../../../services/supplier/SupplierService.ts";
import Loader from "../../utils/Loader.tsx";
import SupplierProductDetailsCard from "./SupplierProductDetailsCard.tsx";
import {ProductSKU} from "../../../types/ProductTypes.ts";
import PaginatedPerPageSelect from "../../utils/pagination/PaginatedPerPageSelect.tsx";
import Pagination from "../../utils/pagination/Pagination.tsx";

interface Props {
    supplierID: string;
}

const SupplierProductList: FC<Props> = ({supplierID}) => {
    const {token} = useAdminToken();
    const [products, setProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);

            try {
                const {status, payload} = await SupplierService
                    .fetchPaginatedProducts(supplierID, page, perPage, token);

                if (status === 200) {
                    setProducts(payload.data.products);
                    setTotalItems(payload.data.totalItems);
                } else {
                    toast.error("Oops. Something bad happened.");
                    setError(payload.message);
                }
            } catch (error) {
                toast.error("Oops. Something bad happened!");
                console.error(error);
            }

            setIsLoading(false);
        }

        fetchProducts();
    }, [page, perPage]);

    return (<>
        {error && <div className="text-red-500 text-center">
            <h1 className="text-sm">Fetching Supplier Products Failed.</h1>
            <h1 className="text-xl">{error}</h1>
        </div>}

        {(isLoading && !error) && <div className="text-center">
            <Loader loading={isLoading} />
        </div>}

        {(!isLoading && !error) && <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
                <h1 className="text-xl">Products</h1>
                <PaginatedPerPageSelect value={perPage} setValue={setPerPage} />
            </div>

            <div className="flex flex-col space-y-3">
                {products.map((product: ProductSKU) => <SupplierProductDetailsCard key={product._id} product={product}/>)}
            </div>

            <div>
                <Pagination totalItems={totalItems} currentPage={page} perPage={perPage} setPage={setPage} />
            </div>
        </div>}
    </>);
};

export default SupplierProductList;
