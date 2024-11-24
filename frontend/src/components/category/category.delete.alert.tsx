import {FC, PropsWithChildren} from 'react';
import {ZCategory} from "@/schema/category.zod.ts";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import CategoryAdminService from "@/services/category/category.service.ts";
import {FetchError} from "@/utils/CustomErrors.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Loader} from "lucide-react";

interface Props {
    category: ZCategory
}

const CategoryDeleteAlert: FC<PropsWithChildren<Props>> = ({children, category}) => {
    const {token} = useAdminToken();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationKey: ['delete_single_category'],
        mutationFn: async () => {
            const {response, result} = await CategoryAdminService.deleteCategory(category._id,token);

            if (response.ok) return result;
            throw new FetchError(response, result.message, result.errors);
        },
        onSuccess: () => {
            toast.success("Category deleted successfully!");

            queryClient.invalidateQueries({queryKey: ['fetch_all_categories']});
            navigate("/admin/category/list");
        },
        onError: (error: FetchError) => {
            toast.error("Oops, something bad happened! Please try again.")
            console.error(error.message);
        }
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete "{category.category}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the category and may delist any associated product.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutate()} disabled={isPending}>
                        {isPending ? <Loader className="animate-spin" /> : "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default CategoryDeleteAlert;
