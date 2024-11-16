import CategoryService from "../../services/category/category.admin.service.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "../../utils/CustomErrors.ts";

export default function useFetchPaginatedCategories(page: number, perPage: number, token: string) {

    const {isLoading, error, status, refetch, data} = useQuery({
        queryFn: async () => {
            const response = await CategoryService.fetchPaginatedCategories(page, perPage, token);
            const { message, data } = await response.json();

            if (response.ok) {
                return data;
            } else {
                throw new FetchError(response, message);
            }
        },
        queryKey: ["fetch-paginated-categories"],
    })


    return {data, isLoading, error, status, refetch};
}