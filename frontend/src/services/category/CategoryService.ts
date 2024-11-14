import fetchQuery from "../../utils/fetchQuery.ts";
import queryAPI from "../../utils/queryAPI.ts";

export default {

    /**
     * Fetch all the categories.
     * @param authToken The authorization token.
     */
    async fetchCategories(authToken: string) {
        const apiLink = `${import.meta.env.VITE_API_URL}/admin/categories/get-all`;
        return fetchQuery(apiLink, "GET", authToken)
    },

    /**
     * Fetch the paginated list of categories.
     * @param page The current page.
     * @param perPage The number of categories per page.
     * @param authToken The authentication token.
     * @returns The response from the API call and the parsed body.
     */
    async fetchPaginatedCategories (page: number, perPage: number, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/get-paginated?page=${page}&perPage=${perPage}`;
        return fetchQuery(link, "GET", authToken);
    },

    /**
     * Find the category by ID.
     * @param categoryID The ID of the category.
     * @param authToken The authentication token.
     */
    async fetchCategory(categoryID: string, authToken: string) {
        const apiLink = `${import.meta.env.VITE_API_URL}/admin/categories/get/${categoryID}`;
        const response = await fetch(apiLink, {
            method: "GET",
            headers: {Authorization: `Bearer ${authToken}`, "Content-Type": "application/json"}
        });

        const payload = await response.json();
        return {status: response.status, payload};
    },

    /**
     * Find product SKUs by category.
     * @param categoryID The ID of the category.
     * @param authToken The authentication token.
     */
    async fetchCategoryWithData(categoryID: string, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/get/${categoryID}/data`;
        return queryAPI(link, "GET", authToken);
    },

    /**
     * Create the category.
     * @param data The category detail.
     * @param authToken The autentication token.
     * @returns The newly created category.
     */
    async createCategory(data: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/create`;
        return queryAPI(link, "POST", authToken, data);
    },

    /**
     * Update category.
     * @param categoryID ID of the category.
     * @param data Data with which to update.
     * @param authToken The authentication token.
     */
    async updateCategory(categoryID: string, data: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/categories/update/${categoryID}`;
        return queryAPI(link, "PATCH", authToken, data);
    },

    /**
     * Delete category.
     * @param categoryID ID of the category.
     * @param authToken The authentication token.
     */
    async deleteCategory(categoryID: string, authToken: string) {
        const apiLink = `${import.meta.env.VITE_API_URL}/admin/categories/delete/${categoryID}`;
        const response = await fetch(apiLink, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${authToken}`, "Content-Type": "application/json"}
        });

        const payload = await response.json();
        return {status: response.status, payload};
    },
}