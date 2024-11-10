import queryAPI from "../../utils/queryAPI.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/suppliers`;

export default {
    async fetchSuppliers(authToken: string) {
      return queryAPI(baseURL, "GET", authToken);
    },

    async fetchPaginatedSuppliers(page: number, perPage: number, authToken: string) {
      const link = `${baseURL}/paginated?page=${page}&perPage=${perPage}`;
      return queryAPI(link, "GET", authToken);
    },

    async createSupplier(data: any, token: string) {
        return queryAPI(baseURL, "POST", token, data);
    },

    async updateSupplier(supplierID: string, data: any, token: string) {
        const link = `${baseURL}/supplier/${supplierID}`
        console.log(link);
        return queryAPI(link, "PATCH", token, data);
    },

    async fetchSupplier(supplierID: string, authToken: string) {
        const link = `${baseURL}/supplier/${supplierID}`;
        return queryAPI(link, "GET", authToken);
    },

    async deleteSupplier(supplierID: string, authToken: string) {
        const link = `${baseURL}/supplier/${supplierID}`;
        return queryAPI(link, "DELETE", authToken);
    },

    async fetchPaginatedProducts(supplierID: string, page: number, perPage: number, authToken: string) {
        const link = `${baseURL}/supplier/${supplierID}/products?page=${page}&perPage=${perPage}`;
        return queryAPI(link, "GET", authToken);
    },
}