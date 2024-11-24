import {FC} from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

interface Props {
    form: any;
    name: string;
    label: string;
    type?: string;
    step?: number;
    placeholder?: string;
}

const FormFieldInput: FC<Props> = ({form, name, label, type = "text", step = 1, placeholder = ""}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input type={type} placeholder={placeholder} step={step} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldInput;
