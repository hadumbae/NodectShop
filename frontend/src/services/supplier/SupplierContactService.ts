import queryAPI from '../../utils/queryAPI.ts';

const baseURL = `${import.meta.env.VITE_API_URL}/admin/suppliers`;

export default {
	async getSupplierContact(supplierID: string, contactID: string, authToken: string) {
		const link = `${baseURL}/${supplierID}/contact-persons/${contactID}`;
		return queryAPI(link, 'GET', authToken);
	},

	async createSupplierContact(supplierID: string, data: any, authToken: string) {
		const link = `${baseURL}/${supplierID}/contact-persons`;
		return queryAPI(link, 'POST', authToken, data);
	},

	async updateSupplierContact(supplierID: string, contactID: string, data: any, authToken: string) {
		const link = `${baseURL}/${supplierID}/contact-persons/${contactID}`;
		return queryAPI(link, 'PATCH', authToken, data);
	},

	async deleteSupplierContact(supplierID: string, contactID: string, authToken: string) {
		const link = `${baseURL}/${supplierID}/contact-persons/${contactID}`;
		return queryAPI(link, 'DELETE', authToken);
	},
};
