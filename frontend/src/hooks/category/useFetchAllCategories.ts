import CategoryService from "../../services/category/category.service.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchAllCategories(token: string) {

    const {isLoading, error, data: categories, status} = useQuery({
        queryFn: async () => {
            const {response, result} = await CategoryService.fetchCategories(token);

            if (response.ok) {
                return result.data;
            } else {
                throw new FetchError(response, result.message, result.errors);
            }
        },
        queryKey: ['all_categories'],
    });

    return {categories, isLoading, error, status};
}