import {useFetch} from "@/utils/useFetch.ts";

const AuthService = {
    async login(data: {}) {
        const link = `${import.meta.env.VITE_API_URL}/auth/signin`;
        return useFetch(link, "POST", "", data);
    }
};

export default AuthService;