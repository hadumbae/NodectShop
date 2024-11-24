import {useQuery} from "@tanstack/react-query";
import ProductAttributeService from "@/services/product/attribute/ProductAttributeService.ts";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchPaginatedProductAttributes(page: number, perPage: number, token: string) {
    const {data, isPending, isSuccess, isError, error, refetch} = useQuery({
        queryKey: ['fetch_all_paginated_product_attributes'],
        queryFn: async () => {
            const {response, result} = await ProductAttributeService.fetchProductAttributesPaginated(page, perPage, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {data, isPending, isSuccess, isError, error, refetch};
}