import queryAPI from "../../utils/queryAPI.ts";
import queryMultipartAPI from "../../utils/queryMultipartAPI.ts";

export default {
    async fetchPaginatedProducts(page: number, perPage: number, authToken: string, title: string) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/products?page=${page}&perPage=${perPage}`;

        if (title && title !== "") {
            apiLink += `&title=${title}`;
        }

        return queryAPI(apiLink, "GET", authToken);
    },

    async fetchProduct(productID: string, authToken: string) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/products/${productID}`;
        return queryAPI(apiLink, "GET", authToken);
    },

    async createProduct(data: any, authToken: string) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/create-product`;
        return queryMultipartAPI(apiLink, "POST", authToken, data);
    },

    async updateProduct(productID: string, data: any, authToken: string) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/products/${productID}`;
        return queryAPI(apiLink, "PATCH", authToken, data);
    },

    async deleteProduct(productID: string, authToken: string) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/products/${productID}`;
        return queryAPI(apiLink, "DELETE", authToken);
    },
}