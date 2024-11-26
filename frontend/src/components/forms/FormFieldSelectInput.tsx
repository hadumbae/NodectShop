import {FC, PropsWithChildren} from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface Props {
    form: any;
    name: string;
    label: string;
    placeholder: string;
}

const FormFieldSelectInput: FC<PropsWithChildren<Props>> = ({children,form, name, label, placeholder}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            { children }
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldSelectInput;
