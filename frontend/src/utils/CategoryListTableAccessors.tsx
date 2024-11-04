import _ from "lodash";
import {Link} from "react-router-dom";
import TableAccessorType from "../types/TableAccessorType.ts";

export const CategoryListAccessors: TableAccessorType[] = [
    {
        name: "Category",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: (item: any) => item.category
    },
    {
        name: "Total Items",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: (item: any) => item.products.length},
    {
        name: "",
        headerStyles: "",
        generateRowStyles: () => "max-w-12 text-center",
        accessor: (item: any) => (
            <Link to={`/admin/category/find/${item._id}/${_.kebabCase(item.category)}`}
                  className="text-sm text-blue-600 hover:underline hover:underline-offset-8">
                View
            </Link>
        )
    },
    {
        name: "",
        headerStyles: "",
        generateRowStyles: () => "max-w-12 text-center",
        accessor: (item: any) => (
            <Link to={`/admin/category/edit/${item._id}/${_.kebabCase(item.category)}`}
                  className="text-sm text-blue-600 hover:underline hover:underline-offset-8">
                Edit
            </Link>
        )
    },
    {
        name: "",
        headerStyles: "",
        generateRowStyles: () => "max-w-12 text-center",
        accessor: () => (
            <Link to="/"
                  className="text-sm text-red-600 hover:underline hover:underline-offset-8">
                Delete
            </Link>
        )
    },
];

export const CategoryProductAccessors = [
    {
        name: "Title",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: (item: any) => item.title
    },
    {
        name: "Description",
        headerStyles: "w-1/2",
        generateRowStyles: () => "",
        accessor: (item: any) => item.description
    },
    {
        name: "SKUs",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: (item: any) => `${item.skus.length} SKUs`
    },
    {
        name: "",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: () => (
            <Link to={`/admin/category/list`}
                className="text-sm text-blue-600 hover:underline hover:underline-offset-8">
                View
            </Link>
        )
    },
];

export const CategoryProductSKUAccessors = [
    {
        name: "Supplier",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: (item: any) => item.supplier ? item.supplier.name : "None"
    },
    {
        name: "SKU",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: (item: any) => item.code
    },
    {
        name: "Product",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: (item: any) => item.product.title
    },
    {
        name: "Unit Price",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: (item: any) => `$${item.unitPrice}`
    },
    {
        name: "Stock",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: (item: any) => `${item.unitStock} units`
    },
    {
        name: "Reorder Level",
        headerStyles: "",
        generateRowStyles: () => "",
        accessor: (item: any) => `${item.reorderLevel} units`
    },
    {
        name: "Discontinuted?",
        headerStyles: "",
        generateRowStyles: (item: any) => item.isDiscontinued ? "text-red-500" : "",
        accessor: (item: any) => item.isDiscontinued ? "Yes" : "No"
    },
    {
        name: "", headerStyles: "",
        generateRowStyles: () => "",
        accessor: () => (
            <Link to={`/admin/category/list`}
                  className="text-sm text-blue-600 hover:underline hover:underline-offset-8">
                View
            </Link>
        )
    },
];
