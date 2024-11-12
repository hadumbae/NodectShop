import {useEffect, useState} from "react";
import CategoryService from "../../services/category/CategoryService.ts";
import {toast} from "react-toastify";
import {Product, ProductSKU} from "../../types/ProductTypes.ts";
import {CategoryType} from "../../schema/CategorySchema.ts";

export default function useFetchCategoryWithData(categoryID: string, token: string) {
    const [isLoading, setIsLoading] = useState(false);

    const [category, setCategory] = useState<CategoryType | null>(null);
    const [skus, setSKUs] = useState<ProductSKU[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setIsLoading(true);

        const fetchCategory = async () => {
            try {
                const {status, payload} = await CategoryService.fetchCategoryWithData(categoryID, token);

                if (status === 200) {
                    setIsLoading(false);

                    setCategory(payload.data.category);
                    setSKUs(payload.data.skus);
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
        category, setCategory,
        skus, setSKUs,
        products, setProducts,
        isLoading, setIsLoading,
    };
}