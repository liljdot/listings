import type { SelectProps } from "@radix-ui/react-select";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select";

interface Props<T extends FieldValues> extends SelectProps {
    control: Control<T>
    name: FieldPath<T>
    type?: string,
    placeholder?: string,
    options: {
        value: string,
        label: string
    }[]
}

const SelectInput = <T extends FieldValues>({
    control,
    name,
    placeholder,
    options,
    ...props
}: Props<T>) => {
    const form = useController({ name, control })

    return (
        <>
            <Select
                onValueChange={form.field.onChange}
                value={form.field.value || ""}
                {...props}
            >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {
                        options.map(option => (
                            <SelectItem
                                key={option.label}
                                value={option.value}
                            >
                                {option.label}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            {
                form.fieldState.error?.message && (
                    <div className="text-sm text-red-500">
                        {form.fieldState.error.message}
                    </div>
                )
            }
        </>
    )
}

export default SelectInput