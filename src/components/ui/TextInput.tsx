import type { ComponentProps } from "react";
import { Input } from "./Input";
import { useController, type Control } from "react-hook-form";

interface Props extends ComponentProps<"input"> {
    control: Control
    name: string
    type: string
}

const TextInput: React.FC<Props> = ({
    control,
    type = "text",
    name,
    ...props
}) => {
    const form = useController({ control, name })
    const error = form.formState.errors[name]

    return (
        <div>
            <Input
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