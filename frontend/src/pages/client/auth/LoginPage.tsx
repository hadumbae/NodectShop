import {FC, useState} from 'react';
import {useDispatch} from "react-redux";
import {login, logout} from "../../../state/slices/authUserSlice.ts";

import FormInput from "../../../components/inputs/FormInput.tsx";
import Button from "../../../components/inputs/Button.tsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {getExpiryDate} from "../../../utils/TimeUtils.ts";


const LoginPage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            setIsLoading(true);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json",},
                    body: JSON.stringify({email: formData.get('email'), password: formData.get('password')})
                }
            );

            const result = await response.json();

            if (response.status != 200) {
                setIsLoading(false);
                setError(result.message);
                dispatch(logout());
                return;
            }

            dispatch(login({
                token: result.token,
                isAdmin: result.isAdmin,
                expiresIn: getExpiryDate(6).getTime()
            }));

            setIsLoading(false);
            toast.success("Logged In Successfully!");

            if (result.isAdmin) {
                return navigate("/admin/dashboard");
            }

            return navigate("/user/profile");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="flex justify-center pt-5">
            <div className="bg-white shadow-lg rounded p-4 w-full md:w-3/4 lg:w-2/5">
                <h1 className="text-2xl">Sign In</h1>
                <form onSubmit={submitHandler}>
                    <div className="mt-5">
                        <FormInput label="Email"
                                   inputType="email"
                                   name="email"
                                   value={email}
                                   changeHandler={setEmail}
                                   disabled={isLoading}
                                   required={true}/>
                    </div>
                    <div className="mt-5 mb-5">
                        <FormInput label="Password"
                                   inputType="password"
                                   name="password"
                                   value={password}
                                   changeHandler={setPassword}
                                   disabled={isLoading}
                                   required={true}/>
                    </div>

                    {
                        error && <div className="text-center text-red-500">
                            {error}
                        </div>
                    }

                    <div className={isLoading ? "flex items-center justify-between" : "text-right"}>
                        {isLoading && <span>Logging In...</span>}
                        <Button type="submit" disabled={isLoading}>Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
