import type { ComponentProps } from "react";
import { Input } from "./Input";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> extends ComponentProps<"input"> {
    control: Control<T>
    name: FieldPath<T>
    type?: string
}

const TextInput = <T extends FieldValues>({
    control,
    type = "text",
    name,
    ...props
}: Props<T>) => {
    const form = useController({ control, name })
    const error = form.formState.errors[name]

    return (
        <div>
            <Input
                name={name}
                type={type}
                onChange={form.field.onChange}
                onBlur={form.field.onBlur}
                value={form.field.value || ""}
                {...props}
            />
            {
                error && (
                    <div className='mt-2 text-sm text-red-500'>
                        {error.message as string}
                    </div>
                )
            }
        </div>
    )
}

export default TextInput;