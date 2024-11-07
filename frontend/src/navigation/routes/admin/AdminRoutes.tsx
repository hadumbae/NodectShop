import ErrorPage from "../../../pages/ErrorPage.tsx";
import AdminLayout from "../../../layouts/AdminLayout.tsx";
import CategoryListPage from "../../../pages/admin/category/CategoryListPage.tsx";
import AdminDashboardPage from "../../../pages/admin/AdminDashboardPage.tsx";
import CategoryShowPage from "../../../pages/admin/category/CategoryShowPage.tsx";
import CategoryUpdatePage from "../../../pages/admin/category/CategoryUpdatePage.tsx";
import AttributeListPage from "../../../pages/admin/attributes/AttributeListPage.tsx";
import SupplierListPage from "../../../pages/admin/supplier/SupplierListPage.tsx";
import SupplierDetailsPage from "../../../pages/admin/supplier/SupplierDetailsPage.tsx";
import SupplierCreateContactPersonPage from "../../../pages/admin/supplier/contacts/SupplierCreateContactPersonPage.tsx";
import SupplierEditPage from "../../../pages/admin/supplier/SupplierEditPage.tsx";
import SupplierEditContactPersonPage from "../../../pages/admin/supplier/contacts/SupplierEditContactPersonPage.tsx";

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
        children: [
            { path: "/admin/category/list", element: <CategoryListPage />, errorElement: <ErrorPage /> },
            { path: "/admin/category/find/:categoryID/:categorySlug", element: <CategoryShowPage />, errorElement: <ErrorPage /> },
            { path: "/admin/category/edit/:categoryID/:categorySlug", element: <CategoryUpdatePage />, errorElement: <ErrorPage /> },
        ]
    },

    // Supplier
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/admin/supplier/list", element: <SupplierListPage />, errorElement: <ErrorPage />},
            { path: "/admin/supplier/find/:supplierID/:slug", element: <SupplierDetailsPage />, errorElement: <ErrorPage />},
            { path: "/admin/supplier/edit/:supplierID/:slug", element: <SupplierEditPage />, errorElement: <ErrorPage />},
            { path: "/admin/supplier/find/:supplierID/:slug/create-contact", element: <SupplierCreateContactPersonPage />, errorElement: <ErrorPage />},
            {
                path: "/admin/supplier/find/:supplierID/:supplierSlug/update-contact/:contactID/:contactSlug",
                element: <SupplierEditContactPersonPage />,
                errorElement: <ErrorPage />},
        ]
    },

    // Attributes
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/admin/product/attribute/list", element: <AttributeListPage />, errorElement: <ErrorPage /> },
        ]
    }
];