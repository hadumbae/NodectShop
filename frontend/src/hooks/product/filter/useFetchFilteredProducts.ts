import {useQuery} from "@tanstack/react-query";
import {FetchError} from "@/utils/CustomErrors.ts";
import ProductFilterService from "@/services/product/product.filter.service.ts";

export default function useFetchFilteredProducts(token: string, queries: any) {
    const {data, isPending, isSuccess, isError, error, refetch } = useQuery({
        queryKey: ['fetch_filtered_products'],
        queryFn: async () => {
            const {response, result} = await ProductFilterService.fetchFilteredProducts(token, queries);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return { data, isPending, isSuccess, isError, error, refetch };
}