import {useFetch} from "@/utils/useFetch.ts";

type PaginationType = {
    page: number;
    perPage: number;
    title: string | undefined;
};

export default {
    async fetchFilteredProducts(authToken: string, queries: PaginationType) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/filter/data?`;

        for (const [key, value] of Object.entries(queries)) {
            if (value !== undefined && value !== "") {
                apiLink = apiLink + `${key}=${encodeURIComponent(value)}&`;
            }
        }

        return useFetch(apiLink, "GET", authToken);
    },

    async fetchProductTypesAndTags(authToken: string) {
        let apiLink = `${import.meta.env.VITE_API_URL}/admin/products/filter/data/types-and-tags`;
        return useFetch(apiLink, "GET", authToken);
    }
}