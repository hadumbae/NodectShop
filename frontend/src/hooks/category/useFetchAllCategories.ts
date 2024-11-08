import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CategoryService from "../../services/category/CategoryService.ts";
import CategoryType from "../../types/CategoryType.ts";

export default function useFetchAllCategories() {
    const {token} = useSelector((state: any) => state.authUser);
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const {status, payload} = await CategoryService.fetchCategories(token);

                if (status === 200) {
                    setCategories(payload.data);
                } else {
                    setCategories([]);
                    console.error(`${status} : ${payload.message}`);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchCategories();
    }, []);

    return {categories};
}