import CategoryService from "../../services/category/category.service.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchCategory(categoryID: string, token: string) {
    const {data:category, status, isPending, isSuccess, isError, error} = useQuery({
        queryKey: ['fetch_single_category'],
        queryFn: async () => {
            const {response, result} = await CategoryService.fetchCategory(categoryID, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {category, status, isPending, isSuccess, isError, error};
}