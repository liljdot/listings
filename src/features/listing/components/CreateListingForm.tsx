import { Card, CardContent, CardHeader, Separator } from "@/components/ui";
import DateRangeInput from "@/components/ui/DateRangeInput";
import Form from "@/components/ui/Form";
import ImagesInput from "@/components/ui/ImagesInput";
import SelectInput from "@/components/ui/SelectInput";
import StepperInput from "@/components/ui/StepperInput";
import TextInput from "@/components/ui/TextInput";
import { useCreateListingMutation } from "@/services/api/listingsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    const [mutate] = useCreateListingMutation()

    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(createListingFormSchema),
        defaultValues: {
            maxGuests: 1
        }
    })

    const onSubmit = form.handleSubmit(data => {
        return mutate(data).unwrap()
            .then(res => navigate(`/listings/${res.id}`))
            .catch((err: string) => {
                console.log(err)
                form.setError("root", {
                    message: err
                })
            })
    })

    const locationOptions = [
        { value: "1", label: "Paris" },
        { value: "2", label: "London" }
    ]

    return (
        <>
            <Card className="mx-auto w-[800px]">
                <CardHeader>
                    <h2 className="text-center text-2xl">
                        Create Listing
                    </h2>
                    <p className="text-center text-muted-foreground">
                        Create a new listing
                    </p>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <Form
                        form={form}
                        onSubmit={onSubmit}
                    >
                        <TextInput
                            control={form.control}
                            name="name"
                            placeholder="Listing name"
                        />
                        <TextInput
                            control={form.control}
                            aria-multiline
                            name={"description"}
                            placeholder="Description"
                        />
                        <SelectInput
                            control={form.control}
                            name={"locationId"}
                            options={locationOptions}
                            placeholder="Select a location"
                        />
                        <ImagesInput
                            control={form.control}
                            name={"images"}
                        />
                        <TextInput
                            control={form.control}
                            name={"price"}
                            placeholder="Price per night"
                        />
                        <StepperInput
                            control={form.control}
                            name={"maxGuests"}
                            label="guest"
                        />
                        <DateRangeInput
                            control={form.control}
                            name={"availability"}
                            placeholder="Select availability"
                            minDate={new Date()}
                        />
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default CreateListingForm;