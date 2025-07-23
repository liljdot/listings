import { useAppDispatch } from "@/state/store";
import type { Listing } from "../types";
import { addFavoriteListing } from "@/state/slices/listingsSlices";
import { Button } from "@/components/ui";
import { Heart } from "lucide-react";
import type { MouseEventHandler } from "react";

interface Props {
    listingId: Listing["id"]
    isFavorited?: boolean
}

const ListingFavoriteButton: React.FC<Props> = ({ listingId }) => {
    const dispatch = useAppDispatch()

    const handleClick: MouseEventHandler = e => {
        e.preventDefault()
        dispatch(addFavoriteListing(listingId))
    }

    return (
        <>
            <Button onClick={handleClick}>
                <Heart />
            </Button>
        </>
    )
}

export default ListingFavoriteButton;