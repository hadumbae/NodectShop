import mongoose from 'mongoose';
import {IProduct} from "./Product/Product.js";
import _ from "lodash";
import {IProductAttribute} from "./Product/ProductAttribute.js";

type CategoryMode = "MANUAL" | "TYPE" | "TAGS";

export interface ICategory {
	category: string;
	mode: CategoryMode

	modeType: string;
	modeTags: string[]

	products: IProduct[];
	attributes: IProductAttribute[];
}

const CategorySchema = new mongoose.Schema<ICategory>(
	{
		category: { type: String, required: true, unique: true },
		mode: {type: String, required: true, default: "MANUAL" },

		modeType: {type: String, required: false, default: null},
		modeTags: [{type: String, required: false}],

		products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false }],
		attributes: [{type: mongoose.Schema.Types.ObjectId, ref: "ProductAttribute", required: false}],
	},
	{ timestamps: true }
);

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
