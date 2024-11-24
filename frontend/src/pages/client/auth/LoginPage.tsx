import {FC} from 'react';
import LoginFormCard from "@/components/forms/auth/LoginFormCard.tsx";


const LoginPage: FC = () => {
    return (
        <div className="flex flex-col justify-center pt-5 space-y-5">
            <section className="flex justify-center">
                <div className="w-full md:w-1/2 2xl:w-1/3">
                    <LoginFormCard />
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
