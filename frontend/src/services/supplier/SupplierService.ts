import queryAPI from "../../utils/queryAPI.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/suppliers`;

export default {
    async fetchPaginatedSuppliers(page: number, perPage: number, authToken: string) {
      const link = `${baseURL}?page=${page}&perPage=${perPage}`;
      return queryAPI(link, "GET", authToken);
    },

    async createSupplier(data: any, token: string) {
        return queryAPI(baseURL, "POST", token, data);
    },

    async updateSupplier(supplierID: string, data: any, token: string) {
        const link = `${baseURL}/${supplierID}`
        console.log(link);
        return queryAPI(link, "PATCH", token, data);
    },

    async fetchSupplier(supplierID: string, authToken: string) {
        const link = `${baseURL}/${supplierID}`;
        return queryAPI(link, "GET", authToken);
    },

    async deleteSupplier(supplierID: string, authToken: string) {
        const link = `${baseURL}/${supplierID}`;
        return queryAPI(link, "DELETE", authToken);
    },
}