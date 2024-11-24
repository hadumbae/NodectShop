import fetchQuery from "../../utils/query/fetchQuery.ts";
import {useFetch} from "@/utils/useFetch.ts";

export default {

    /**
     * Fetch all the categories.
     * @param authToken The authorization token.
     * @returns An object with the response and JSON result.
     */
    async fetchCategories(authToken: string) {
        const apiLink = `${import.meta.env.VITE_API_URL}/admin/categories/all`;
        return useFetch(apiLink, "GET", authToken)
    },

    /**
     * Fetch the paginated list of categories.
     * @param page The current page.
     * @param perPage The number of categories per page.
     * @param authToken The authentication token.
     * @returns The response from the API call and the parsed body.
     */
    async fetchPaginatedCategories (page: number, perPage: number, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/paginated/all?page=${page}&perPage=${perPage}`;
        return fetchQuery(link, "GET", authToken);
    },

    /**
     * Fetch the paginated list of categories.
     * @param page The current page.
     * @param perPage The number of categories per page.
     * @param authToken The authentication token.
     * @returns The response from the API call and the parsed body.
     */
    async fetchPaginatedProductsByCategory (categoryID: string, page: number, perPage: number, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/paginated/by-category/${categoryID}/products?page=${page}&perPage=${perPage}`;
        return useFetch(link, "GET", authToken);
    },

    /**
     * Find the category by ID.
     * @param categoryID The ID of the category.
     * @param authToken The authentication token.
     */
    async fetchCategory(categoryID: string, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/get/${categoryID}`;
        return useFetch(link, "GET", authToken);
    },

    /**
     * Create the category.
     * @param data The category detail.
     * @param authToken The autentication token.
     * @returns The newly created category.
     */
    async createCategory(data: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/create`;
        return useFetch(link, "POST", authToken, data);
    },

    /**
     * Update category.
     * @param categoryID ID of the category.
     * @param data Data with which to update.
     * @param authToken The authentication token.
     */
    async updateCategory(categoryID: string, data: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/update/${categoryID}`;
        return useFetch(link, "PATCH", authToken, data);
    },

    /**
     * Delete category.
     * @param categoryID ID of the category.
     * @param authToken The authentication token.
     */
    async deleteCategory(categoryID: string, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/delete/${categoryID}`;
        return useFetch(link, "DELETE", authToken);
    },
}