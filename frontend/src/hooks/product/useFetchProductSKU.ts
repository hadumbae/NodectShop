import ProductSKUService from "../../services/product/sku/ProductSKUService.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchProductSKU(productID: string, skuID: string, token: string) {
    const {data: sku, isPending, isSuccess, isError, error, refetch } = useQuery({
        queryKey: ['fetch_single_product_sku'],
        queryFn: async () => {
            const {response, result} = await ProductSKUService.fetchProductSKU(productID, skuID, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {sku, isPending, isSuccess, isError, error, refetch};
}