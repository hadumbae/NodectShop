import {useEffect, useState} from "react";
import {ProductSKU} from "../../types/ProductTypes.ts";
import ProductSKUService from "../../services/product/ProductSKUService.ts";

export default function useFetchProductSKU(productID: string, skuID: string, token: string) {
    const [sku, setSKU] = useState<ProductSKU | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refetch, setRefetch] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(isLoading);

        const fetchProductSKU = async () => {
            const {status, payload} = await ProductSKUService.fetchProductSKU(productID, skuID, token);

            if (status === 200) {
                setSKU(payload.data);
            } else {
                setError(`${status} : ${payload.message}`);
                setSKU(null);
            }
        }

        fetchProductSKU();
        setIsLoading(false);
    }, [refetch]);

    return {
        sku, setSKU,
        error, setError,
        isLoading, setIsLoading,
        refetch, setRefetch
    };
}