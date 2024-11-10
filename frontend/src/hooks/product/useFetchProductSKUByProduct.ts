import {useEffect, useState} from "react";
import {ProductSKU} from "../../types/ProductTypes.ts";
import ProductSKUService from "../../services/product/ProductSKUService.ts";

export default function useFetchProductSKUByProduct(productID: string, token: string) {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [skus, setSKUs] = useState<ProductSKU[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [refetch, setRefetch] = useState<boolean>(false);


    useEffect(() => {
        setIsLoading(isLoading);

        const fetchProductSKUs = async () => {
            const {status, payload} = await ProductSKUService.fetchPaginatedSKUsByProduct(productID, page, perPage, token);

            if (status === 200) {
                setSKUs(payload.data.skus);
                setTotalItems(payload.data.totalItems);
            } else {
                setError(`${status} : ${payload.message}`);
                setSKUs([]);
                setTotalItems(0);
            }
        }

        fetchProductSKUs();
        setIsLoading(false);
    }, [page, perPage, refetch]);

    return {
        page, setPage,
        perPage, setPerPage,
        error, setError,
        skus, setSKUs,
        totalItems, setTotalItems,
        refetch, setRefetch,
        isLoading};
}