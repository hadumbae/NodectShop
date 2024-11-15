import useAdminToken from "../../hooks/useAdminToken.ts";

const AdminDashboardPage = () => {
    useAdminToken();

    return (
        <div>
            AdminDashboardPage
        </div>
    );
};

export default AdminDashboardPage;
