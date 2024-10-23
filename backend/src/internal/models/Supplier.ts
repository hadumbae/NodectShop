import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true },
		website: { type: String, required: true },
		contact: {
			email: { type: String, required: false },
			phone: { type: String, required: false },
			fax: { type: String, required: false },
		},
		contactPersons: [
			{
				name: { type: String, required: true },
				title: { type: String, required: true },
				email: { type: String, required: true },
				phone: { type: String, required: true },
			},
		],
		address: {
			street: { type: String, required: true },
			district: { type: String, required: false },
			city: { type: String, required: true },
			region: { type: String, required: false },
			country: { type: String, required: true },
			postalCode: { type: String, required: true },
		},
	},
	{ timestamps: true }
);

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);
export default Supplier;
