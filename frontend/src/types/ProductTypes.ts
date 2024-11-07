import {Supplier} from "./SupplierTypes.ts";
import CategoryType from "./CategoryType.ts";

export interface ProductSKU {
    _id: string;
    product: Product;
    supplier: Supplier;
    code: string;
    unitPrice: number;
    unitStock: number;
    reorderLevel: number;
    isDiscontinued: boolean;
    images: [];
    options: [];
}

export interface Product {
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: CategoryType | null;
    skus: ProductSKU[];
}