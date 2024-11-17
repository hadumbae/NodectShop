import mongoose, {Types} from 'mongoose';
import ProductSKU from "./Product/ProductSKU.js";

interface IContactPerson {
	readonly _id?: Types.ObjectId
	name: string;
	title: string;
	email: string;
	phone: string;
}

interface ISupplier {
	name: string;
	website: string;
	contact: {
		email: string;
		phone: string;
		fax: string;
	},
	contactPersons: IContactPerson[],
	address: {
		street: string;
		city: string;
		state: string;
		country: string;
		postalCode: string;
	}
}

const SupplierSchema = new mongoose.Schema<ISupplier>(
	{
		name: { type: String, required: true, unique: true },
		website: { type: String, required: true },
		contact: {
			email: { type: String, required: false, default: null },
			phone: { type: String, required: false, default: null },
			fax: { type: String, required: false, default: null},
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
			city: { type: String, required: true },
			state: { type: String, required: true },
			country: { type: String, required: true },
			postalCode: { type: String, required: true },
		},
	},
	{ timestamps: true }
);

SupplierSchema.post('deleteOne', {document: true, query: false}, async function() {
	await ProductSKU.updateMany({supplier: this._id}, {supplier: null});
})

const Supplier = mongoose.model<ISupplier>('Supplier', SupplierSchema);
export default Supplier;
