import {useEffect, useState} from "react";
import {ContactPerson} from "../../types/SupplierTypes.ts";
import SupplierContactService from "../../services/supplier/SupplierContactService.ts";

export default function useFetchSupplierContact(supplierID: string, contactID: string, token: string) {
    const [contact, setContact] = useState<ContactPerson | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const {status, payload} = await SupplierContactService.getSupplierContact(supplierID, contactID, token);

                if(status === 200) {
                    setContact(payload.data);
                } else {
                    console.log(status);
                    console.log(payload.message);
                    setError(`${status} : ${payload.message}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchContact();
    })


    return {contact, error};
}
