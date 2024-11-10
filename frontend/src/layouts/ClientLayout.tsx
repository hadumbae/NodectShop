import {Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {CiCircleChevUp} from "react-icons/ci";
import { GrCycle } from "react-icons/gr";
import {RiUserAddFill, RiLoginCircleFill, RiLogoutCircleRFill} from "react-icons/ri";

import {logout} from "../state/slices/authUserSlice.ts";
import {toast} from "react-toastify";
import useClientToken from "../hooks/useClientToken.ts";

const ClientLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token, isAdmin} = useClientToken();

    const logoutHandler = () => {
        dispatch(logout());
        toast.success("Logged Out Successfully.");
        return navigate("/");
    };

    return (
        <div className="relative container mx-auto">
            <div className="p-6 grid grid-cols-3">
                <div>
                    <Link to="/" className="font-orbitron text-3xl flex items-center">
                        <CiCircleChevUp className="mr-1" />
                        NoDECT
                    </Link>
                </div>

                <div className="hidden md:flex md:justify-center space-x-6">
                    <NavLink to="/" className="hover:underline hover:underline-offset-8 hover:text-black">Home</NavLink>
                    <NavLink to="/about" className="hover:underline hover:underline-offset-8 hover:text-black">About</NavLink>
                </div>

                <div className="hidden md:flex md:justify-end md:space-x-6 items-center">
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
