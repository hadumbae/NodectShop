import queryAPI from "../../utils/query/queryAPI.ts";
import queryMultipartAPI from "../../utils/query/queryMultipartAPI.ts";
import {useFetchMultipart} from "@/utils/useFetch.ts";

export default {
    async fetchPaginatedProducts(page: number, perPage: number, authToken: string, title: string) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/paginated?page=${page}&perPage=${perPage}`;

        if (title && title !== "") {
            apiLink += `&title=${title}`;
        }

        return queryAPI(apiLink, "GET", authToken);
    },

    async fetchProduct(productID: string, authToken: string) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/get-product/${productID}`;
        return queryAPI(apiLink, "GET", authToken);
    },

    async createProduct(data: any, authToken: string) {
        let link = `${import.meta.env.VITE_API_URL}/admin/products/create-product`;
        return useFetchMultipart(link, "POST", authToken, data);
    },

    async updateProduct(productID: string, data: any, authToken: string) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/update-product/${productID}`;
        return queryMultipartAPI(apiLink, "PATCH", authToken, data);
    },

    async deleteProduct(productID: string, authToken: string) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/products/${productID}`;
        return queryAPI(apiLink, "DELETE", authToken);
    },
}