import Homepage from "../../pages/client/Homepage.tsx";
import AboutPage from "../../pages/client/AboutPage.tsx";
import ClientLayout from "../../layouts/ClientLayout.tsx";
import ErrorPage from "../../pages/ErrorPage.tsx";

export default [
    {
        path: "/",
        element: <ClientLayout />,
        errorElement: <ErrorPage />,
        children: [
            {path: "/", element: <Homepage />, errorElement: <ErrorPage />},
            {path: '/about', element: <AboutPage />, errorElement: <ErrorPage />},
        ]
    },
];