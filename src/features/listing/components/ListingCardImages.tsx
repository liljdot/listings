import { useState } from "react";
import type { Listing } from "../types";
// @ts-expect-error importing a non-TS file
import { getImageUrl } from "@/lib/utils/images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui";

interface Props {
    listing: Listing
}

const ListingCardImages: React.FC<Props> = ({ listing }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <>
            <Carousel
                className="w-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <CarouselContent className="ml-0">
                    {
                        listing.images.map((image, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-0"
                            >
                                <img
                                    className="h-[200px] w-full object-cover rounded-md"
                                    src={getImageUrl(image)}
                                    alt={`${listing.name} image ${index + 1}`}
                                />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                {
                    isHovering && (
                        <>
                            <CarouselPrevious
                                className="absolute left-4"
                            />
                            <CarouselNext
                                className="absolute right-4"
                            />
                        </>
                    )
                }
            </Carousel>
        </>
    )
}

export default ListingCardImages;