import CategoryService from "../../services/category/category.admin.service.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchCategoryWithData(categoryID: string, token: string) {
    const {data, status, isLoading, isSuccess, error} = useQuery({
        queryKey: ['fetch_single_category_with_data'],
        queryFn: async () => {
            const {response, result} = await CategoryService.fetchCategoryWithData(categoryID, token);

            if (response.ok) {
                return result.data;
            } else {
                throw new FetchError(response, result.message, result.errors);
            }
        }
    });

    return {data, status, isLoading, isSuccess, error};
}