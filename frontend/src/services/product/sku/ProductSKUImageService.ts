import queryAPI from "../../../utils/queryAPI.ts";
import queryMultipartAPI from "../../../utils/queryMultipartAPI.ts";

export  default {
    async uploadSKUImages(data: any, authToken: string){
        const link = `${import.meta.env.VITE_API_URL}/admin/products/sku-images`;
        console.log(data);
        return queryMultipartAPI(link, "POST", authToken, data);
    },

    async markAsPrimary(imageID: string, authToken: string){
        const link = `${import.meta.env.VITE_API_URL}/admin/products/sku-images/${imageID}/mark-primary`;
        return queryAPI(link, "POST", authToken);
    },

    async deleteSKUImage(imageID: string, authToken: string){
        const link = `${import.meta.env.VITE_API_URL}/admin/products/sku-images/${imageID}`;
        return queryAPI(link, "DELETE", authToken);
    },
}