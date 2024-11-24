import {useQuery} from "@tanstack/react-query";
import SupplierService from "@/services/supplier/supplier.service.ts";
import {FetchError} from "@/utils/CustomErrors.ts";

export default function useFetchPaginatedSuppliers(page: number, perPage: number, token: string) {
    const {data, isPending, isSuccess, isError, error, refetch} = useQuery({
        queryKey: ["fetch_all_paginated_suppliers"],
        queryFn: async () => {
            const { response, result } = await SupplierService.fetchPaginatedSuppliers(page, perPage, token);

            if (response.ok) return result.data;
            throw new FetchError(response, result.message, result.errors);
        }
    });

    return {data, isPending, isSuccess, isError, error, refetch};
}