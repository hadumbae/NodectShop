import {FC} from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

interface Props {
    form: any;
    name: string;
    label: string;
    placeholder?: string;
}

const FormFieldTextArea: FC<Props> = ({form, name, label, placeholder = ""}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            className="resize-none"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldTextArea;
