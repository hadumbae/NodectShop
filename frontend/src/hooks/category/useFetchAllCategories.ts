import CategoryService from "../../services/category/category.admin.service.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "../../utils/CustomErrors.ts";

export default function useFetchAllCategories(token: string) {

    const {isLoading, error, data: categories, status} = useQuery({
        queryFn: async () => {
            const response = await CategoryService.fetchCategories(token);
            const { message, data } = await response.json();

            if (response.ok) {
                return data;
            } else {
                throw new FetchError(response, message);
            }
        },
        queryKey: ['all_categories'],
    });

    return {categories, isLoading, error, status};
}