import {FC, PropsWithChildren} from 'react';
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

interface Props {
    form: any;
    name: string;
    label: string;
}

const FormFieldSelectInput: FC<PropsWithChildren<Props>> = ({form, name, label}) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                            {label}
                        </FormLabel>
                    </div>
                </FormItem>
            )}
        />
    );
};

export default FormFieldSelectInput;
