import queryAPI from "../../../utils/queryAPI.ts";

export default {
    async fetchProductAttributesPaginated (page: number, perPage: number, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes?page=${page}&perPage=${perPage}`;
        return queryAPI(link, "GET", authToken)
    },

    async createProductAttribute (formData: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes`;
        return queryAPI(link, "POST", authToken, formData)
    },

    async findProductAttribute (attributeID: string, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/${attributeID}`;
        return queryAPI(link, "GET", authToken)
    },

    async updateProductAttribute (attributeID: string, formData: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/${attributeID}`;
        return queryAPI(link, "PATCH", authToken, formData)
    },

    async deleteProductAttribute (attributeID: string, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/${attributeID}`;
        return queryAPI(link, "DELETE", authToken)
    },
}