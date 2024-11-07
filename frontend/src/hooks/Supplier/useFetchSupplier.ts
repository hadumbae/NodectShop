import {useEffect, useState} from "react";
import {Supplier} from "../../types/SupplierTypes.ts";
import SupplierService from "../../services/supplier/SupplierService.ts";

export default function useFetchSupplier(supplierID: string, token: string) {
    const [supplier, setSupplier] = useState<Supplier | null>(null);

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const {status, payload} = await SupplierService.fetchSupplier(supplierID!, token);

                if (status === 200) {
                    setSupplier(payload.data);
                } else {
                    console.log("[useFetchSupplier] ",  `${status} : ${payload.message}`);
                }
            } catch (error) {
                console.error("[useFetchSupplier] ", error);
            }
        }

        fetchSupplier();
    }, []);

    return {supplier, setSupplier};
}