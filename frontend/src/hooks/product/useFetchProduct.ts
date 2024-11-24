import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import ProductService from "../../services/product/product.service.ts";
import {Product} from "../../types/ProductTypes.ts";
import {redirect} from "react-router-dom";

export default function useFetchProduct(productID: string, token: string) {
    const [product, setProduct] = useState<Product | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);

            try {
                const {status, payload} = await ProductService.fetchProduct(productID, token);

                if (status === 200) {
                    setProduct(payload.data);
                    setError(null);
                } else {
                    console.error(`${status} : ${payload.message}`);
                    return redirect("/admin/product/list")
                }

            } catch (error: any) {
                console.error(error);
                toast.error("Oops. Something bad happened!");
                setError(typeof error === "string" ? error : error.message);
            }

            setIsLoading(false);
        }

        fetchProduct();
    }, []);

    return {
        product,
        setProduct,
        error,
        isLoading,
    }
}