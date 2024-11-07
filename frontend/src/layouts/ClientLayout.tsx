import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {CiCircleChevUp} from "react-icons/ci";
import { GrCycle } from "react-icons/gr";
import {RiUserAddFill, RiLoginCircleFill, RiLogoutCircleRFill} from "react-icons/ri";

import {logout} from "../state/slices/authUserSlice.ts";
import {toast} from "react-toastify";
import {expired} from "../utils/TimeUtils.ts";

const ClientLayout = () => {
    const { token, isAdmin, expiresIn } = useSelector((state: any) => state.authUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(Date.now());
    console.log(expiresIn);

    if (token) {
        if (expired(expiresIn)) {
            dispatch(logout());
            toast.success("Login Expired. Please try again.");
        }
    }

    const logoutHandler = () => {
        dispatch(logout());
        toast.success("Logged Out Successfully.");
        return navigate("/");
    };

    return (
        <div className="relative container mx-auto">
            <div className="p-6 flex items-center justify-between">
                <Link to="/" className="font-orbitron text-3xl flex items-center">
                    <CiCircleChevUp className="mr-1" />
                    NoDECT
                </Link>
                <div className="hidden md:flex space-x-6">
                    <NavLink to="/" className="hover:underline hover:underline-offset-8 hover:text-black">Home</NavLink>
                    <NavLink to="/about" className="hover:underline hover:underline-offset-8 hover:text-black">About</NavLink>
                </div>
                <div className="hidden md:flex space-x-6 items-center">
                    {!token && <NavLink
                        to="/auth/register"
                        className="text-2xl" >
                        <RiUserAddFill />
                    </NavLink>}

                    {!token && <NavLink
                        to="/auth/login"
                        className="text-2xl" >
                        <RiLoginCircleFill />
                    </NavLink>}

                    {(token && isAdmin) && <NavLink
                        to="/admin/dashboard"
                        className="text-2xl"
                    >
                        <GrCycle />
                    </NavLink>}

                    {token && <button
                        className="text-2xl"
                        onClick={logoutHandler}
                    >
                        <RiLogoutCircleRFill />
                    </button>}
                </div>
            </div>

            <div className="px-3 py-2 border-t">
                <Outlet />
            </div>
        </div>
    );
};

export default ClientLayout;
