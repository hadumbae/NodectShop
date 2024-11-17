import queryAPI from "../../utils/queryAPI.ts";
import {useFetch} from "@/utils/useFetch.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/admin/suppliers`;

export default {
    async fetchSuppliers(authToken: string) {
      return queryAPI(baseURL, "GET", authToken);
    },

    async fetchPaginatedSuppliers(page: number, perPage: number, authToken: string) {
      const link = `${baseURL}/get-paginated?page=${page}&perPage=${perPage}`;
      return queryAPI(link, "GET", authToken);
    },

    async createSupplier(data: any, token: string) {
        const link = `${baseURL}/create-supplier`
        return useFetch(link, "POST", token, data);
    },

    async updateSupplier(supplierID: string, data: any, token: string) {
        const link = `${baseURL}get-/supplier/${supplierID}`
        return queryAPI(link, "PATCH", token, data);
    },

    async fetchSupplier(supplierID: string, authToken: string) {
        const link = `${baseURL}/get-supplier/${supplierID}`;
        return queryAPI(link, "GET", authToken);
    },

    async deleteSupplier(supplierID: string, authToken: string) {
        const link = `${baseURL}/get-supplier/${supplierID}`;
        return queryAPI(link, "DELETE", authToken);
    },

    async fetchPaginatedProducts(supplierID: string, page: number, perPage: number, authToken: string) {
        const link = `${baseURL}/supplier/${supplierID}/products?page=${page}&perPage=${perPage}`;
        return queryAPI(link, "GET", authToken);
    },
}