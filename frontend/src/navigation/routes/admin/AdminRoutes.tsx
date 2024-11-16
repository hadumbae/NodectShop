import ErrorPage from "../../../pages/ErrorPage.tsx";
import AdminLayout from "../../../layouts/AdminLayout.tsx";
import CategoryListPage from "../../../pages/admin/category/CategoryListPage.tsx";
import AdminDashboardPage from "../../../pages/admin/AdminDashboardPage.tsx";
import CategoryDetailsPage from "../../../pages/admin/category/CategoryDetailsPage.tsx";
import CategoryUpdatePage from "../../../pages/admin/category/CategoryEditPage.tsx";
import AttributeListPage from "../../../pages/admin/attributes/AttributeListPage.tsx";
import SupplierListPage from "../../../pages/admin/supplier/SupplierListPage.tsx";
import SupplierDetailsPage from "../../../pages/admin/supplier/SupplierDetailsPage.tsx";
import SupplierCreateContactPersonPage from "../../../pages/admin/supplier/contacts/SupplierCreateContactPersonPage.tsx";
import SupplierEditPage from "../../../pages/admin/supplier/SupplierEditPage.tsx";
import SupplierEditContactPersonPage from "../../../pages/admin/supplier/contacts/SupplierEditContactPersonPage.tsx";
import isAdminAuthLoader from "../../loaders/auth/isAdminAuthLoader.tsx";
import ProductListPage from "../../../pages/admin/product/ProductListPage.tsx";
import ProductCreatePage from "../../../pages/admin/product/ProductCreatePage.tsx";
import ProductDetailsPage from "../../../pages/admin/product/ProductDetailsPage.tsx";
import ProductEditPage from "../../../pages/admin/product/ProductEditPage.tsx";
import ProductSKUCreatePage from "../../../pages/admin/product/sku/ProductSKUCreatePage.tsx";
import ProductSKUEditPage from "../../../pages/admin/product/sku/ProductSKUEditPage.tsx";
import ProductSKUDetailsPage from "../../../pages/admin/product/sku/ProductSKUDetailsPage.tsx";
import ProductSKUImagePage from "../../../pages/admin/product/sku/ProductSKUImagePage.tsx";
import ProductSKUOptionPage from "../../../pages/admin/product/sku/ProductSKUOptionPage.tsx";
import SupplierCreatePage from "@/pages/admin/supplier/SupplierCreatePage.tsx";
import CategoryCreatePage from "@/pages/admin/category/CategoryCreatePage.tsx";

export default [
    // Admin
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/admin/dashboard", element: <AdminDashboardPage />, errorElement: <ErrorPage /> },
        ]
    },

    // Category
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        loader: isAdminAuthLoader,
        children: [
            { path: "/admin/category/list", element: <CategoryListPage />, errorElement: <ErrorPage /> },
            { path: "/admin/category/create", element: <CategoryCreatePage />, errorElement: <ErrorPage /> },
            { path: "/admin/category/find/:categoryID/:categorySlug", element: <CategoryDetailsPage />, errorElement: <ErrorPage /> },
            { path: "/admin/category/edit/:categoryID/:categorySlug", element: <CategoryUpdatePage />, errorElement: <ErrorPage /> },
        ]
    },

    // Supplier
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        loader: isAdminAuthLoader,
        children: [
            { path: "/admin/supplier/list", element: <SupplierListPage />, errorElement: <ErrorPage />},
            { path: "/admin/supplier/create", element: <SupplierCreatePage />, errorElement: <ErrorPage /> },
            { path: "/admin/supplier/find/:supplierID/:slug", element: <SupplierDetailsPage />, errorElement: <ErrorPage />},
            { path: "/admin/supplier/edit/:supplierID/:slug", element: <SupplierEditPage />, errorElement: <ErrorPage />},
            { path: "/admin/supplier/find/:supplierID/:slug/create-contact", element: <SupplierCreateContactPersonPage />, errorElement: <ErrorPage />},
            {
                path: "/admin/supplier/find/:supplierID/:supplierSlug/update-contact/:contactID/:contactSlug",
                element: <SupplierEditContactPersonPage />,
                errorElement: <ErrorPage />},
        ]
    },

    // Products
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        loader: isAdminAuthLoader,
        children: [
            { path: "/admin/product/list", element: <ProductListPage />, errorElement: <ErrorPage /> },
            { path: "/admin/product/create", element: <ProductCreatePage />, errorElement: <ErrorPage /> },
            { path: "/admin/product/find/:productID/:productSlug", element: <ProductDetailsPage />, errorElement: <ErrorPage /> },
            { path: "/admin/product/edit/:productID/:productSlug", element: <ProductEditPage />, errorElement: <ErrorPage /> },

            // Product SKU
            { path: "/admin/product/create/:productID/:productSlug/sku", element: <ProductSKUCreatePage />, errorElement: <ErrorPage /> },
            { path: "/admin/product/edit/:productID/:productSlug/sku/:skuID/:skuSlug", element: <ProductSKUEditPage />, errorElement: <ErrorPage /> },
            { path: "/admin/product/find/:productID/:productSlug/sku/:skuID/:skuSlug", element: <ProductSKUDetailsPage />, errorElement: <ErrorPage /> },
            { path: "/admin/product/find/:productID/:productSlug/sku/:skuID/:skuSlug/images", element: <ProductSKUImagePage />, errorElement: <ErrorPage /> },
            { path: "/admin/product/find/:productID/:productSlug/sku/:skuID/:skuSlug/options", element: <ProductSKUOptionPage />, errorElement: <ErrorPage /> },
        ]
    },

    // Attributes
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        loader: isAdminAuthLoader,
        children: [
            { path: "/admin/product/attribute/list", element: <AttributeListPage />, errorElement: <ErrorPage /> },
        ]
    }
];