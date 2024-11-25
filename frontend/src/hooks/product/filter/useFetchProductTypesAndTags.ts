import {useQuery} from "@tanstack/react-query";
import ProductFilterService from "@/services/product/product.filter.service.ts";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchProductTypesAndTags(token: string) {
    const { data, isPending, isSuccess, isError, error, refetch } = useQuery({
        queryKey: ['fetch_product_types_and_tags'],
        queryFn: async () => {
            const {response, result} = await ProductFilterService.fetchProductTypesAndTags(token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {data, isPending, isSuccess, isError, error, refetch};
}