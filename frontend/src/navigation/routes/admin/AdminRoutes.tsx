import ErrorPage from "../../../pages/ErrorPage.tsx";
import AdminLayout from "../../../layouts/AdminLayout.tsx";
import CategoryListPage from "../../../pages/admin/category/CategoryListPage.tsx";
import AdminDashboardPage from "../../../pages/admin/AdminDashboardPage.tsx";
import CategoryShowPage from "../../../pages/admin/category/CategoryShowPage.tsx";
import CategoryUpdatePage from "../../../pages/admin/category/CategoryUpdatePage.tsx";
import AttributeListPage from "../../../pages/admin/attributes/AttributeListPage.tsx";

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