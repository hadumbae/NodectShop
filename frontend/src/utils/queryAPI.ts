export default async (link: string, method: string, authToken: string, formData: any = {}) =>{
    const fetchOptions: any = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    };

    if (method != 'GET' && method != 'HEAD') {
        fetchOptions.body = JSON.stringify(formData)
    }

    const response = await fetch(link, fetchOptions);
    const payload = await response.json();
    return {status: response.status, payload};
}