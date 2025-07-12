import { Card, CardContent } from "@/components/ui/card";
import type { Listing } from "../types";
import { getImageUrl } from "@/lib/utils/images.js"

interface Props {
    listing: Listing
}

const ListingCard: React.FC<Props> = ({ listing }) => {

    return (
        <Card className="w-[320px]">
            <img
                src={getImageUrl(listing.images[0])}
                alt={listing.name}
                className="w-full h-[200px] rounded-md object-cover"
            />
            <CardContent className="p-4">
                <h2 className="mb-0 text-xl font-semibold">
                    {listing.name}
                </h2>
            </CardContent>
        </Card>
    )
}

export default ListingCard;