import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui";
import type { ListingForList } from "../types";
// @ts-expect-error import from js file
import { getImageUrl } from '@/lib/utils/images';
import { useState } from "react";

interface Props {
    listing: ListingForList;
}

const ListingDetailsCardImages: React.FC<Props> = ({ listing }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <>
            <img
                className='mb-4 h-[500px] w-full rounded-md object-cover'
                src={getImageUrl(listing.images[currentIndex])}
                alt={listing.name}
            />
            <Carousel className="mx-auto mb-4 w-[90%]" loop>
                <CarouselContent>
                    {
                        listing.images.map((image, index) => (
                            <CarouselItem
                                key={index}
                                className="cursor-pointer basis-1/3"
                                onClick={() => setCurrentIndex(index)}
                                isSelected={index === currentIndex}
                            >
                                <img
                                    className="h-52 w-full object-cover shadow-sm"
                                    src={getImageUrl(image)}
                                    alt={listing.name}
                                />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    )
};

export default ListingDetailsCardImages