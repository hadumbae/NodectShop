import {useQuery} from "@tanstack/react-query";
import ProductAttributeService from "@/services/product/attribute/ProductAttributeService.ts";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchProductAttributes(token: string) {
    const {data: attributes, isPending, isSuccess, isError, error, refetch} = useQuery({
        queryKey: ['fetch_all_product_attributes'],
        queryFn: async () => {
            const {response, result} = await ProductAttributeService.fetchProductAttributes(token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {attributes, isPending, isSuccess, isError, error, refetch};
}