import SupplierService from "../../services/supplier/supplier.service.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchSuppliers(token: string) {
    const {data: suppliers, isPending, isSuccess, isError, error, refetch} = useQuery({
        queryKey: ['fetch_all_suppliers'],
        queryFn: async () => {
            const {response, result} = await SupplierService.fetchSuppliers(token);
            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {suppliers, isPending, isSuccess, isError, error, refetch};
}