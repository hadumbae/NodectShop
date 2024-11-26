import ProductSKUService from "../../services/product/sku/ProductSKUService.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchProductSKUByProduct(productID: string, page: number, perPage: number, token: string) {
    const {data, isPending, isSuccess, isError, error, refetch} = useQuery({
        queryKey: ["fetch_paginated_product_skus_by_product_id"],
        queryFn: async () => {
            const {response, result} = await ProductSKUService.fetchPaginatedSKUsByProduct(productID, page, perPage, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {data, isPending, isSuccess, isError, error, refetch};
}