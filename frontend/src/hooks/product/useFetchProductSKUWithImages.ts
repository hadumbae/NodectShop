import {useEffect, useState} from "react";
import {ProductSKU} from "../../types/ProductTypes.ts";
import ProductSKUService from "../../services/product/sku/ProductSKUService.ts";

export default function useFetchProductSKUWithImages(productID: string, skuID: string, token: string) {
    const [sku, setSKU] = useState<ProductSKU | null>(null);
    const [images, setImages] = useState<any[] | null>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(isLoading);

        const fetchProductSKU = async () => {
            const {status, payload} = await ProductSKUService.fetchProductSKU(productID, skuID, token);

            if (status === 200) {
                setSKU(payload.data);
                setImages(payload.data.images);
            } else {
                setError(`${status} : ${payload.message}`);
                setSKU(null);
            }
        }

        fetchProductSKU();
        setIsLoading(false);
    }, []);

    return {
        sku, setSKU,
        images, setImages,
        error, setError,
        isLoading, setIsLoading,
    };
}