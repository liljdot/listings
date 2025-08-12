import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { DateRangePicker, type DateRangePickerProps } from "./DatePicker";

interface Props<T extends FieldValues> extends Omit<DateRangePickerProps, "onChange"> {
    control: Control<T>
    name: FieldPath<T>
}

const DateRangeInput = <T extends FieldValues>({
    control,
    name,
    ...props
}: Props<T>) => {
    const form = useController({ control, name })

    return (
        <div className="flex flex-col gap-2">
            <DateRangePicker
                {...props}
                value={form.field.value}
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
    )
}

export default DateRangeInput;