import { cn } from "@/lib/utils"
import type { ListingForList } from "../types"
import { Star } from "lucide-react"

interface Props {
    listing: ListingForList
    className?: string
}

const ListingRatingStars: React.FC<Props> = ({ listing, className }) => {

    return (
        <>
            <div className={cn(
                "inline-flex flex-row items-center rounded-md bg-background px-2 py-1",
                className
            )}>
                <Star className="h-4 w-4 fill-star text-star" />
                <span className="ml-2">
                    {listing.rating}
                </span>
            </div>
        </>
    )
}

export default ListingRatingStars