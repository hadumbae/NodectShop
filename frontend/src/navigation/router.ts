import {createBrowserRouter} from "react-router-dom";
import BaseRoutes from "./routes/BaseRoutes.tsx";
import ClientAuthRoutes from "./routes/client/ClientAuthRoutes.tsx";
import ClientUserProfileRoutes from "./routes/client/ClientUserProfileRoutes.tsx";
import AdminRoutes from "./routes/admin/AdminRoutes.tsx";

export default createBrowserRouter(
    [
        ...BaseRoutes,
        ...ClientAuthRoutes,
        ...ClientUserProfileRoutes,

        ...AdminRoutes
    ]
);
