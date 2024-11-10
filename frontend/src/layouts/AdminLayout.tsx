import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {CiCircleChevUp} from "react-icons/ci";
import {RiLogoutCircleRFill} from "react-icons/ri";
import {logout} from "../state/slices/authUserSlice.ts";
import {toast} from "react-toastify";
import {GrCycle} from "react-icons/gr";
import {expired} from "../utils/TimeUtils.ts";

const AdminLayout = () => {
    const { token, isAdmin, expiresIn } = useSelector((state: any) => state.authUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (token) {
        if (expired(expiresIn)) {
            dispatch(logout());
            toast.success("Login Expired. Please try again.");
        }

        if (!isAdmin) {
            toast.error("Unauthorized.");
            navigate("/");
        }
    } else {
        toast.error("Unauthorized.");
        navigate("/auth/login")
    }

    const logoutHandler = () => {
        dispatch(logout());
        toast.success("Logged Out Successfully.");
        navigate("/");
    };

    return (
        <div className="relative container mx-auto">
            <div className="p-6 grid grid-cols-3">
                <div className="felx items-center">
                    <Link to="/" className="font-orbitron text-3xl flex items-center">
                        <CiCircleChevUp className="mr-1" />
                        NoDECT
                        <span className="text-sm">
                        admin
                    </span>
                    </Link>
                </div>

                <div className="hidden md:flex md:space-x-6 md:justify-center">
                    <NavLink to="/admin/dashboard" className="hover:underline hover:underline-offset-8 hover:text-black">Dashboard</NavLink>
                    <NavLink to="/admin/category/list" className="hover:underline hover:underline-offset-8 hover:text-black">Categories</NavLink>
                    <NavLink to="/admin/supplier/list" className="hover:underline hover:underline-offset-8 hover:text-black">Suppliers</NavLink>
                    <NavLink to="/admin/product/attribute/list" className="hover:underline hover:underline-offset-8 hover:text-black">Attributes</NavLink>
                    <NavLink to="/admin/product/list" className="hover:underline hover:underline-offset-8 hover:text-black">Products</NavLink>
                    <NavLink to="/admin/category/list" className="hover:underline hover:underline-offset-8 hover:text-black">Orders</NavLink>
                </div>

                <div className="hidden md:flex md:space-x-6 md:justify-end md:items-center">
                    <NavLink
                        to="/"
                        className="text-2xl"
                    >
                        <GrCycle />
                    </NavLink>

                    <button
                        className="text-2xl"
                        onClick={logoutHandler}
                    >
                        <RiLogoutCircleRFill />
                    </button>
                </div>
            </div>

            <div className="px-3 py-2 border-t">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
