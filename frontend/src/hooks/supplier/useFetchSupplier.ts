import SupplierService from "../../services/supplier/supplier.service.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchSupplier(supplierID: string, token: string) {
    const {data: supplier, isPending, isSuccess, isError, error, refetch} = useQuery({
        queryKey: ['fetch_single_supplier'],
        queryFn: async () => {
            const {response, result} = await SupplierService.fetchSupplier(supplierID, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {supplier, isPending, isSuccess, isError, error, refetch};
}