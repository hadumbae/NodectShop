import queryAPI from "../../../utils/query/queryAPI.ts";
import {useFetch} from "@/utils/useFetch.ts";

export default {
    async fetchProductAttributes (authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes`;
        return useFetch(link, "GET", authToken)
    },

    async fetchProductAttributesPaginated (page: number, perPage: number, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/paginated?page=${page}&perPage=${perPage}`;
        return useFetch(link, "GET", authToken)
    },

    async createProductAttribute (formData: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes`;
        return useFetch(link, "POST", authToken, formData)
    },

    async findProductAttribute (attributeID: string, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/attribute/${attributeID}`;
        return queryAPI(link, "GET", authToken)
    },

    async updateProductAttribute (attributeID: string, formData: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/attribute/${attributeID}`;
        return useFetch(link, "PATCH", authToken, formData)
    },

    async deleteProductAttribute (attributeID: string, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/attribute/${attributeID}`;
        return queryAPI(link, "DELETE", authToken)
    },
}