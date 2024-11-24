import CategoryService from "../../services/category/category.service.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "../../utils/CustomErrors.ts";

export default function useFetchPaginatedCategories(page: number, perPage: number, token: string) {

    const {data, isPending, isSuccess, isError, error, refetch} = useQuery({
        queryKey: ["fetch_paginated_categories"],
        queryFn: async () => {
            const response = await CategoryService.fetchPaginatedCategories(page, perPage, token);
            const { message, data } = await response.json();

            if (response.ok) return data;
            throw new FetchError(response, message);
        },
    })


    return {data, isPending, isSuccess, isError, error, refetch};
}