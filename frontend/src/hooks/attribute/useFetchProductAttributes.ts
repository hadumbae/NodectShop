import {useEffect, useState} from "react";
import {ProductAttributeType} from "../../types/ProductAttributeTypes.ts";
import ProductAttributeService from "../../services/product/attribute/ProductAttributeService.ts";
import {toast} from "react-toastify";

export default function useFetchProductAttributes(token: string) {
    const [attributes, setAttributes] = useState<ProductAttributeType[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAttributes = async () => {
            setIsLoading(true);
            const {status, payload} = await ProductAttributeService.fetchProductAttributes(token);

            if (status === 200) {
                setAttributes(payload.data);
            } else {
                toast.error("Oops. Something bad happened!");
                console.error(`${status} : ${payload.message}`);
                setError(payload.message);
            }

            setIsLoading(false);
        }

        fetchAttributes();
    }, []);

    return {attributes, isLoading, error};
}