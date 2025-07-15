import { Card, CardContent } from "@/components/ui";
import type { Listing } from "../types";
// @ts-expect-error import from js
import { getImageUrl } from "@/lib/utils/images.js"
import { DollarSign, Pin, Users } from "lucide-react";

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
            <CardContent className="flex flex-col gap-2 p-4">
                <h2 className="mb-2 text-xl font-semibold">
                    {listing.name}
                </h2>
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                        <span className="font-bold text-foreground">{listing.price}</span>/night
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Pin className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                        <span className="font-bold text-foreground">
                            {listing.location.name}
                        </span>
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                        <span className="font-bold text-foreground">
                            {listing.maxGuests} Guests
                        </span>
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}

export default ListingCard;