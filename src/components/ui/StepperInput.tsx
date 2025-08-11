import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Stepper, type StepperProps } from "./Stepper";

interface Props<T extends FieldValues> extends Omit<StepperProps, "value" | "onChange"> {
    control: Control<T>
    name: FieldPath<T>
}

const StepperInput = <T extends FieldValues>({
    control,
    name,
    ...props
}: Props<T>) => {
    const form = useController({ control, name })

    return (
        <>
            <div className="flex flex-col gap-2">
                <Stepper
                    {...props}
                    value={form.field.value || 0}
                    onChange={form.field.onChange}
                />
                {
                    form.fieldState.error && (
                        <div className="text-sm text-red-500">
                            {form.fieldState.error.message}
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default StepperInput