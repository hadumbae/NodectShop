export default {
    /**
     * Fetch the paginated list of categories.
     * @param page The current page.
     * @param perPage The number of categories per page.
     * @param authToken The authentication token.
     * @returns The response from the API call and the parsed body.
     */
    async fetchPaginatedCategories (page: number, perPage: number, authToken: string) {
        const apiLink = `${import.meta.env.VITE_API_URL}/admin/categories/paginated?page=${page}&perPage=${perPage}`;
        const response = await fetch(apiLink, {
            method: "GET",
            headers: {Authorization: `Bearer ${authToken}`, "Content-Type": "application/json"}
        });

        const result = await response.json();
        return {response, result};
    },

    async fetchCategories(authToken: string) {
        const apiLink = `${import.meta.env.VITE_API_URL}/admin/categories`;
        const response = await fetch(apiLink, {
            method: "GET",
            headers: {Authorization: `Bearer ${authToken}`, "Content-Type": "application/json"}
        });

        const payload = await response.json();
        return {status: response.status, payload};
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

    async updateCategory(categoryID: string, formData: FormData, authToken: string) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/categories/category/${categoryID}`, {
            method: "PATCH", headers: { "Authorization": `Bearer ${authToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({category: formData.get('category')})
        });

        const payload = await response.json();
        return {status: response.status, payload}
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