import {useEffect, useState} from "react";
import {Supplier} from "../../types/SupplierTypes.ts";
import SupplierService from "../../services/supplier/SupplierService.ts";

export default function useFetchSuppliers(token: string) {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const {status, payload} = await SupplierService.fetchSuppliers(token);

            if (status === 200) {
                setSuppliers(payload.data);
            } else {
                console.log(`${status} : ${payload.message}`);
                setSuppliers([])
            }
        }

        fetchSuppliers();
    }, []);

    return {suppliers, setSuppliers};
}