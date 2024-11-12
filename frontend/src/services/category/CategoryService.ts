import fetchQuery from "../../utils/fetchQuery.ts";
import queryAPI from "../../utils/queryAPI.ts";

export default {
    /**
     * Fetch the paginated list of categories.
     * @param page The current page.
     * @param perPage The number of categories per page.
     * @param authToken The authentication token.
     * @returns The response from the API call and the parsed body.
     */
    async fetchPaginatedCategories (page: number, perPage: number, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/paginated?page=${page}&perPage=${perPage}`;
        return fetchQuery(link, "GET", authToken);
    },

    async fetchCategories(authToken: string) {
        const apiLink = `${import.meta.env.VITE_API_URL}/admin/categories`;
        return fetchQuery(apiLink, "GET", authToken)
    },

    async fetchCategory(categoryID: string, authToken: string) {
        const apiLink = `${import.meta.env.VITE_API_URL}/admin/categories/category/${categoryID}`;
        const response = await fetch(apiLink, {
            method: "GET",
            headers: {Authorization: `Bearer ${authToken}`, "Content-Type": "application/json"}
        });

        const payload = await response.json();
        return {status: response.status, payload};
    },

    async fetchCategoryWithData(categoryID: string, authToken: string) {
        const apiLink = `${import.meta.env.VITE_API_URL}/admin/categories/category/${categoryID}/data`;
        const response = await fetch(apiLink, {
            method: "GET",
            headers: {Authorization: `Bearer ${authToken}`, "Content-Type": "application/json"}
        });

        const payload = await response.json();
        return {status: response.status, payload};
    },

    async createCategory(data: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories`;
        return queryAPI(link, "POST", authToken, data);
    },

    async updateCategory(categoryID: string, data: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/category/${categoryID}`;
        return queryAPI(link, "PATCH", authToken, data);
    },

    async deleteCategory(categoryID: string, authToken: string) {
        const apiLink = `${import.meta.env.VITE_API_URL}/admin/categories/category/${categoryID}`;
        const response = await fetch(apiLink, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${authToken}`, "Content-Type": "application/json"}
        });

        const payload = await response.json();
        return {status: response.status, payload};
    },
}