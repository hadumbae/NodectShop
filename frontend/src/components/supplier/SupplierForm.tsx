import {FC} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {SupplierSubmitSchema, SupplierSubmitType} from "@/schema/supplier.validation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RefreshCcw} from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import SupplierService from "@/services/supplier/SupplierService.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import {FetchError} from "@/utils/CustomErrors.ts";
import {useNavigate} from "react-router-dom";
import _ from "lodash";


const SupplierForm: FC = () => {
    const {token} = useAdminToken();
    const navigate = useNavigate();

    const form = useForm<SupplierSubmitType>({
        resolver: zodResolver(SupplierSubmitSchema),
        defaultValues: {
            name: "",
            website: "",
            contact : { email: "", phone: "", fax: "" },
            address: { street: "", city: "", state: "", country: "", postalCode: "" },
        },
    });

    const mutation = useMutation({
        mutationKey: ['create-supplier-form-mutation'],
        mutationFn: async (values: any) => {
            const {response, result} = await SupplierService.createSupplier(values, token)

            if (response.ok) {
                return result;
            } else {
                throw new FetchError(response, result.message, result.errors)
            }
        },
        onSuccess: (result) => {
            console.log(result);
            navigate(`/admin/supplier/find/${result.data._id}/${_.kebabCase(result.data.name)}`);
        },
        onError: (error: FetchError) => {
            if (error.errors) {
                for (const validationError of error.errors) {
                    form.setError(validationError.path, {type: "manual", message: validationError.msg});
                }
            }
        },
    })

    const onSubmit = (values: any) => {
        console.log("Submit Values: ", values);
        mutation.mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            <span className="text-2xl font-bold">Create Supplier</span>
                            <button className="hover:animate-spin" onClick={() => form.reset()}>
                                <RefreshCcw />
                            </button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div className="space-y-5">
                            <section className="space-y-3">
                                <div>
                                    <h1 className="text-xl font-bold">Supplier</h1>
                                    <Separator/>
                                </div>

                                <FormField
                                    name="name"
                                    control={form.control}
                                    render={({field}) => (<FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" type="text" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>)}
                                />

                                <FormField
                                    name="website"
                                    control={form.control}
                                    render={({field}) => (<FormItem>
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Website" type="text" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>)}
                                />
                            </section>

                            <section className="space-y-3">
                                <div>
                                    <h1 className="text-xl font-bold">Contact</h1>
                                    <Separator/>
                                </div>

                                <FormField
                                    name="contact.email"
                                    control={form.control}
                                    render={({field}) => (<FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>)}
                                />

                                <FormField
                                    name="contact.phone"
                                    control={form.control}
                                    render={({field}) => (<FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Phone" type="text" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>)}
                                />
                            </section>
                        </div>

                        <section className="space-y-3">
                            <div>
                                <h1 className="text-xl font-bold">Address</h1>
                                <Separator/>
                            </div>

                            <FormField
                                name="address.street"
                                control={form.control}
                                render={({field}) => (<FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input placeholder="street" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>)}
                            />

                            <FormField
                                name="address.city"
                                control={form.control}
                                render={({field}) => (<FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="city" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>)}
                            />

                            <FormField
                                name="address.state"
                                control={form.control}
                                render={({field}) => (<FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="state" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>)}
                            />

                            <FormField
                                name="address.country"
                                control={form.control}
                                render={({field}) => (<FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="country" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>)}
                            />

                            <FormField
                                name="address.postalCode"
                                control={form.control}
                                render={({field}) => (<FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Postal Code" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>)}
                            />
                        </section>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Submit</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default SupplierForm;
