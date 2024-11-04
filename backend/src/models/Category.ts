import mongoose from 'mongoose';
import {IProduct} from "./Product/Product.js";
import _ from "lodash";

export interface ICategory {
	category: string;
	products: IProduct[];
}

const CategorySchema = new mongoose.Schema<ICategory>(
	{
		category: { type: String, required: true, unique: true },
		products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false }],
	},
	{ timestamps: true }
);

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
