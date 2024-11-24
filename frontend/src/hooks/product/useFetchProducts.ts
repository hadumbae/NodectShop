import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import ProductService from "../../services/product/product.service.ts";

export default function useFetchProducts(token: string) {
    const [products, setProducts] = useState([]);

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refetch, setRefetch] = useState({});

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(9);
    const [totalItems, setTotalItems] = useState(perPage);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);

            try {
                const {status, payload} = await ProductService.fetchPaginatedProducts(page, perPage, token, title);

                if (status === 200) {
                    setProducts(payload.data.products);
                    setTotalItems(payload.data.totalItems);
                    setError(null);
                }

            } catch (error: any) {
                console.error(error);
                toast.error("Oops. Something bad happened!");
                setError(typeof error === "string" ? error : error.message);
            }

            setIsLoading(false);
        }

        fetchProducts();
    }, [refetch, page, perPage, title]);

    return {
        products,
        setProducts,
        error,
        isLoading,
        setRefetch,
        page,
        setPage,
        perPage,
        setPerPage,
        totalItems,
        setTotalItems,
        title,
        setTitle,
    }
}