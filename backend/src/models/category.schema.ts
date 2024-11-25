import mongoose from 'mongoose';
import {IProduct} from "./Product/product.schema.js";
import _ from "lodash";
import {IProductAttribute} from "./Product/product.attribute.schema.js";

export type CategoryMode = "MANUAL" | "TYPE" | "TAGS";

export interface ICategory {
	readonly _id: string;
	category: string;
	mode: CategoryMode

	modeTypes: string[];
	modeTags: string[];

	products: IProduct[];
	attributes: IProductAttribute[];
}

const CategorySchema = new mongoose.Schema<ICategory>(
	{
		category: { type: String, required: true, unique: true },
		mode: {type: String, required: true, default: "MANUAL" },

		modeTypes: [{ type: String, required: false }],
		modeTags: [{ type: String, required: false }],

		products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false }],
		attributes: [{type: mongoose.Schema.Types.ObjectId, ref: "ProductAttribute", required: false}],
	},
	{ timestamps: true }
);

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
