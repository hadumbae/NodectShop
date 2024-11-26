import {FetchError} from "@/utils/CustomErrors.ts";

/**
 * Query the provided API link.
 * @param link API Link
 * @param method HTTP Method
 * @param authToken JWT Token
 * @param formData FormData
 */
export const useFetch = async (link: string, method: string, authToken: string, formData: any = {}) => {
    const fetchOptions: any = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    };

    return await fetchAPI(link, method, formData, fetchOptions);
}

/**
 * Query the provided API link. Multipart.
 * @param link API Link
 * @param method HTTP Method
 * @param authToken JWT Token
 * @param formData FormData
 */
export const useFetchMultipart = async (link: string, method: string, authToken: string, formData: any = {}) => {
    const fetchOptions: any = { method: method, headers: { "Authorization": `Bearer ${authToken}` }, body: formData };
    return await fetchAPI(link, method, formData, fetchOptions);
}

/**
 * Query the API and return the response.
 * @param link API Link
 * @param method HTTP Method
 * @param formData FormData
 * @param fetchOptions Options for FetchAPI
 */
const fetchAPI = async (link: string, method: string, formData: any, fetchOptions: any) => {
    if (method != 'GET' && method != 'HEAD' && !fetchOptions.body) {
        fetchOptions.body = JSON.stringify(formData);
    }

    const response = await fetch(link, fetchOptions);
    let result;

    try {
        result = await response.json();
    } catch (error) {
        throw new FetchError(response, `${response.status} ${response.statusText}`, null);
    }

    return {response, result};
}
