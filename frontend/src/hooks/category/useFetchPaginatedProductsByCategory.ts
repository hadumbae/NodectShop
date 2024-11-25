import {useQuery} from "@tanstack/react-query";
import CategoryService from "@/services/category/category.service.ts";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchPaginatedProductsByCategory(categoryID: string, page: number, perPage: number, token: string) {
    const {data, isPending, isSuccess, isError, error, refetch} = useQuery({
        queryKey: [`fetch_paginated_products_by_category_${categoryID}`],
        queryFn: async () => {
            const {response, result} = await CategoryService.fetchPaginatedProductsByCategory(categoryID, page, perPage, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {data, isPending, isSuccess, isError, error, refetch};
}