import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const createListingFormSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    locationId: z.coerce.number(),
    images: z.array(z.string()).min(1),
    price: z.coerce.number({
        error: "Price must be a whole number"
    })
    .min(1),
    maxGuests: z.number().min(1),
    availability: z.object({
        from: z.date(),
        to: z.date()
    })
})

export type CreateListingFormSchemaType = z.infer<typeof createListingFormSchema>

const CreateListingForm: React.FC = () => {
    const form = useForm({
        resolver: zodResolver(createListingFormSchema),
        defaultValues: {
            maxGuests: 1
        }
    })

    return (
        <>
        
        </>
    )
}

export default CreateListingForm;