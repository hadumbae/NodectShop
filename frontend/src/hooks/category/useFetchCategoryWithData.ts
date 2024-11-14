import {useEffect, useState} from "react";
import CategoryService from "../../services/category/CategoryService.ts";
import {toast} from "react-toastify";
import {CategoryType} from "../../schema/CategorySchema.ts";

export default function useFetchCategoryWithData(categoryID: string, token: string) {
    const [isLoading, setIsLoading] = useState(false);

    const [category, setCategory] = useState<CategoryType | null>(null);
    const [products, setProducts] = useState<any | null>([]);

    useEffect(() => {
        setIsLoading(true);

        const fetchCategory = async () => {
            try {
                const {status, payload} = await CategoryService.fetchCategoryWithData(categoryID, token);

                if (status === 200) {
                    setIsLoading(false);

                    setCategory(payload.data.category);
                    setProducts(payload.data.products);
                } else {
                    toast.error("Error! Could not fetch category.");
                    console.error(`${status} : ${payload.message}`);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchCategory();
    }, []);

    return {
        category, products,
        isLoading, setIsLoading,
    };
}