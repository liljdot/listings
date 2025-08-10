// This component will select from a list of predetermined images. No upload is involved as there is only a mock backend

import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./Carousel"
import { useState } from "react"
// @ts-expect-error import from js file
import { getImageUrl } from '@/lib/utils/images';

interface Props<T extends FieldValues> {
    control: Control<T>
    name: FieldPath<T>
}

const ImagesInput = <T extends FieldValues>({
    control,
    name
}: Props<T>) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const imageOptions: string[] = [
        "listing1-1.jpg",
        "listing1-2.jpg",
        "listing1-3.jpg",
        "listing1-4.jpg",
        "listing1-5.jpg",
        "listing1-6.jpg",
        "listing1-7.jpg",
    ]

    const form = useController({ name, control })

    const handleImageSelect = (image: string) => {
        const currentImages: string[] = form.field.value || []

        const updatedImages = currentImages.includes(image)
            ? currentImages.filter(item => item != image)
            : [
                ...currentImages,
                image
            ]

        setSelectedImages(updatedImages)
        form.field.onChange(updatedImages)
    }

    return (
        <>
            <div className="flex flex-col gap-2">
                <Carousel className="mx-auto w-[90%]">
                    <CarouselContent>
                        {
                            imageOptions.map(image => (
                                <CarouselItem
                                    key={image}
                                    className="basis-1/3"
                                    isSelected={selectedImages.includes(image)}
                                    onClick={() => handleImageSelect(image)}
                                >
                                    <img
                                        className="h-[200px] w-full cursor-pointer rounded-md object-cover"
                                        src={getImageUrl(image)}
                                        alt={`Listing Image Option ${image}`}
                                    />
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </>
    )
}

export default ImagesInput;