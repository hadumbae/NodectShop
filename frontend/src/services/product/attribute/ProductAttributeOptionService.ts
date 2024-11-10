import queryAPI from "../../../utils/queryAPI.ts";

export default {

    async fetchProductAttributeOptions (attributeID: string, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/attribute/${attributeID}/options`;
        return queryAPI(link, "GET", authToken)
    },

    async createProductAttributeOption (attributeID: string, formData: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/attribute/${attributeID}/options`;
        return queryAPI(link, "POST", authToken, formData)
    },

    async findProductAttributeOption (attributeID: string, optionID: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/attribute/${attributeID}/options/${optionID}`;
        return queryAPI(link, "GET", authToken)
    },

    async updateProductAttributeOption (attributeID: string, optionID: string, formData: any, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/attribute/${attributeID}/options/${optionID}`;
        return queryAPI(link, "PATCH", authToken, formData)
    },

    async deleteProductAttributeOption (attributeID: string, optionID: string, authToken: string) {
        const link = `${import.meta.env.VITE_API_URL}/admin/attributes/attribute/${attributeID}/options/${optionID}`;
        return queryAPI(link, "DELETE", authToken)
    },
}

