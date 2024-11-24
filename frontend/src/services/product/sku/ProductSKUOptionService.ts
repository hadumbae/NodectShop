import queryAPI from "../../../utils/query/queryAPI.ts";

const BASE_URL = 'http://localhost:8080/admin/products/options';

export default {
    /**
     * Associate the option to the SKU.
     * @param skuID string - ID of the SKU
     * @param optionID string - ID of the option
     * @param token string - Auth Token
     * @returns The status and response of the API query.
     */
    async associateOption(skuID: string, optionID: string, token: string) {
        const link = `${BASE_URL}/add`;
        const data = {skuID, optionID};
        return queryAPI(link, "POST", token, data);
    },

    /**
     * Dissociate the option from the SKU.
     * @param skuID string - ID of the SKU
     * @param optionID string - ID of the option
     * @param token string - Auth Token
     * @returns The status and response of the query.
     */
    async dissociateOption(skuID: string, optionID: string, token: string) {
        const link = `${BASE_URL}/remove`;
        const data = {skuID, optionID};
        return queryAPI(link, "POST", token, data);
    }
}