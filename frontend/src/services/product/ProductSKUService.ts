import queryAPI from "../../utils/queryAPI.ts";

export  default {
    async fetchPaginatedSKUsByProduct(productID: string, page: number, perPage: number, authToken: string){
        const link = `${import.meta.env.VITE_API_URL}/admin/products/product-sku/${productID}/paginated-sku?page=${page}&perPage=${perPage}`;
        return queryAPI(link, "GET", authToken);
    },

    async createProductSKU(productID: string, data: any, authToken: string){
        const link = `${import.meta.env.VITE_API_URL}/admin/products/product-sku/${productID}/sku`;
        return queryAPI(link, "POST", authToken, data);
    },

    async fetchProductSKU(productID: string, skuID: string, authToken: string){
        const link = `${import.meta.env.VITE_API_URL}/admin/products/product-sku/${productID}/sku/${skuID}`;
        return queryAPI(link, "GET", authToken);
    },


    async updateProductSKU(productID: string, skuID: string, data: any, authToken: string){
        const link = `${import.meta.env.VITE_API_URL}/admin/products/product-sku/${productID}/sku/${skuID}`;
        return queryAPI(link, "PATCH", authToken, data);
    },

    async deleteProductSKU(productID: string, skuID: string, authToken: string){
        const link = `${import.meta.env.VITE_API_URL}/admin/products/product-sku/${productID}/sku/${skuID}`;
        return queryAPI(link, "DELETE", authToken);
    },
}