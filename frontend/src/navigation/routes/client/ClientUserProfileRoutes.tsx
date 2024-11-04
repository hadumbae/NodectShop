import ClientLayout from "../../../layouts/ClientLayout.tsx";
import ErrorPage from "../../../pages/ErrorPage.tsx";
import UserProfilePage from "../../../pages/client/user/UserProfilePage.tsx";
import isClientAuthLoader from "../../loaders/auth/isClientAuthLoader.tsx";

export default [
    {
        path: '/',
        element: <ClientLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/user/profile", element: <UserProfilePage />, errorElement: <ErrorPage />, loader: isClientAuthLoader},
        ]
    }
];