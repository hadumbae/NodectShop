import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {ZCategory} from "../../schema/category.validate.schema.ts";
import CategoryService from "../../services/category/category.service.ts";

export default function useFetchProductsByCategory(categoryID: string, token: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<ZCategory | null>(null);

    useEffect(() => {
        setIsLoading(true);

        const fetchProductsByCategory = async () => {
            try {
                const {status, payload} = await CategoryService.fetchProductsByCategory(categoryID, token);

                if (status === 200) {
                    setIsLoading(false);

                    setProducts(payload.data);
                } else {
                    toast.error("Error! Could not fetch category.");
                    console.error(`${status} : ${payload.message}`);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchProductsByCategory();
    }, []);

    return {
        products, setProducts,
        isLoading, setIsLoading,
    };
}