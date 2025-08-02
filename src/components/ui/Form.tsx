import type { ComponentProps, ReactNode } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues> extends ComponentProps<"form"> {
    children: ReactNode
    form: UseFormReturn<T>
}

const Form = <T extends FieldValues>({
    children,
    form,
    ...props
}: Props<T>) => {

    return (
        <form
            className="flex flex-col gap-4"
            {...props}
        >
            {children}
            {form.formState.errors.root && (
                <div className='text-center text-sm text-red-500'>
                    {form.formState.errors.root.message}
                </div>
            )}
        </form>
    )
}

export default Form;