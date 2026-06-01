import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import { DateTimePicker, type DateTimePickerProps } from "@mui/x-date-pickers";

type Props<T extends FieldValues> = {} & UseControllerProps<T> & DateTimePickerProps<Date>

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({...props});

  return (
    <DateTimePicker 
        {...props}
        value={field.value ? new Date(field.value) : null}
        onChange={value => {
            field.onChange(new Date(value!));       // Date() does not want null; have to override TypeScript with "!"
        }}                                          // We know it will not be null if it is being changed, but TypeScript doesn't
        sx={{width: '100%'}}                        // Don't overuse, but may be necessary with 3rd-party libraries
        
        // SlotProps allow you to define and set properties for a component
        // In this case, making it so our DateTime picker will act as text (similar to other errors)
        slotProps={{
            textField: {
                onBlue: field.onBlur,
                error: !!fieldState.error,
                helperText: fieldState.error?.message
            }
        }}
    />                                              
  )
}