import ClientLayout from "../../../layouts/ClientLayout.tsx";
import ErrorPage from "../../../pages/ErrorPage.tsx";
import RegisterPage from "../../../pages/client/auth/RegisterPage.tsx";
import LoginPage from "../../../pages/client/auth/LoginPage.tsx";
import LogoutPage from "../../../pages/client/auth/LogoutPage.tsx";

export default [
    {
        path: "/auth",
        element: <ClientLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/auth/register", element: <RegisterPage />, errorElement: <ErrorPage /> },
            { path: "/auth/login", element: <LoginPage />, errorElement: <ErrorPage /> },
            { path: "/auth/logout", element: <LogoutPage />, errorElement: <ErrorPage /> },
        ]
    }
];