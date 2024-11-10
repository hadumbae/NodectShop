/**
 * Query the provided API link.
 * @param link API Link
 * @param method HTTP Method
 * @param authToken JWT Token
 * @param formData FormData
 */
export default async (link: string, method: string, authToken: string, formData: any = {}) =>{
    console.log(formData)

    const fetchOptions: any = {
        method: method,
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    };

    if (method != 'GET' && method != 'HEAD') {
        fetchOptions.body = formData;
    }

    console.log(fetchOptions);

    const response = await fetch(link, fetchOptions);
    const payload = await response.json();
    return {status: response.status, payload};
}