import ProductService from "../../services/product/product.service.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchProduct(productID: string, token: string) {
    const { data: product, isPending, isSuccess, isError, error, refetch } = useQuery({
        queryKey: ['fetch_single_product'],
        queryFn: async () => {
            const {response, result} = await ProductService.fetchProduct(productID, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {product, isPending, isSuccess, isError, error, refetch};
}