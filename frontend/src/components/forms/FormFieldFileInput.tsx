import {FC} from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

interface Props {
    form: any;
    name: string;
    label: string;
}

const FormFieldFileInput: FC<Props> = ({form, name, label}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field: {value, onChange, ...fieldProps} }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type="file"
                            placeholder="image"
                            {...fieldProps}
                            onChange={(event) => onChange(event.target.files && event.target.files[0])}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldFileInput;
