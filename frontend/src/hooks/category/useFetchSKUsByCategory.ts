import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import CategoryService from "../../services/category/category.service.ts";

export default function useFetchSKUsByCategory(categoryID: string, token: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [skus, setSKUs] = useState<any[]>([]);

    useEffect(() => {
        setIsLoading(true);

        const fetchSKUsByCategory = async () => {
            try {
                const {status, payload} = await CategoryService.fetchSKUsByCategory(categoryID, token);

                if (status === 200) {
                    setIsLoading(false);

                    setSKUs(payload.data);
                } else {
                    toast.error("Error! Could not fetch category.");
                    console.error(`${status} : ${payload.message}`);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchSKUsByCategory();
    }, []);

    return {
        skus, setSKUs,
        isLoading, setIsLoading,
    };
}