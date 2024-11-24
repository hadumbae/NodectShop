import { FC } from 'react';
import {useForm} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySubmitSchema, CategorySubmitType, ZCategory } from '@/schema/category.zod.ts';

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {useMutation} from "@tanstack/react-query";
import CategoryAdminService from "@/services/category/category.service.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import {FetchError} from "@/utils/CustomErrors.ts";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import {toast} from "react-toastify";

interface Props {
	category?: ZCategory;
}

const CategoryForm: FC<Props> = ({ category }) => {
	const {token} = useAdminToken();
	const navigate = useNavigate();

	const form = useForm<CategorySubmitType>({
		resolver: zodResolver(CategorySubmitSchema),
		defaultValues: {
			category: category?.category || "",
			mode: category?.mode || "MANUAL",
			modeType: category?.modeType || "",
			modeTags: category?.modeTags.join(",") || ""
		}
	});

	const mutation = useMutation({
		mutationFn: async (values: any) => {
			const {response, result} = category ?
				await CategoryAdminService.updateCategory(category._id, values, token) :
				await CategoryAdminService.createCategory(values, token);

			if (response.ok) {
				return result;
			} else {
				throw new FetchError(response, result.message, result.errors);
			}
		},
		onSuccess: (result) => {
			toast.success(`Category ${category ? "updated" : "created"} successfully.`);
			navigate(`/admin/category/find/${result.data._id}/${_.kebabCase(result.data.category)}`);
		},
		onError: (error: FetchError) => {
			if (error.errors) {
				for (let validationError of error.errors ) {
					form.setError(validationError.path, {type: "manual", message: validationError.msg});
				}
			}
		}
	})

	const mode = form.watch("mode");

	const onSubmit = (values: CategorySubmitType) => {
		console.log(values);
		mutation.mutate(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>{category ? "Update" : "Create"} Category</CardTitle>
					</CardHeader>
					<CardContent className="space-y-5">
						<FormField
							name={"category"}
							control={form.control}
							render={({field}) => <FormItem>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>}
						/>

						<FormField
							name={"mode"}
							control={form.control}
							render={({field}) => <FormItem
								className="space-y-2"
							>
								<FormLabel>Category Mode</FormLabel>
								<FormControl>
									<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="MANUAL" />
											</FormControl>
											<FormLabel>Manual</FormLabel>
										</FormItem>

										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="TYPE" />
											</FormControl>
											<FormLabel>By Type</FormLabel>
										</FormItem>

										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="TAGS" />
											</FormControl>
											<FormLabel>By Tags</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
							</FormItem>}
						/>

						{mode == "TYPE" && <FormField
							name={"modeType"}
							control={form.control}
							render={({field}) => <FormItem>
								<FormLabel>Filter Type</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>}
						/>}

						{mode == "TAGS" && <FormField
							name={"modeTags"}
							control={form.control}
							render={({field}) => <FormItem>
								<FormLabel>Filter Tags</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>}
						/>}
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full bg-primary text-gray-600">Submit</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
};

export default CategoryForm;
