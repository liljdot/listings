import { useAppDispatch, type RootState } from "@/state/store";
import type { Listing } from "../types";
import { addFavoriteListing, removeFavoriteListing } from "@/state/slices/listingsSlices";
import { Button } from "@/components/ui";
import { Heart } from "lucide-react";
import { useMemo, type MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

interface Props {
    listingId: Listing["id"]
    className?: string
}

const ListingFavoriteButton: React.FC<Props> = ({ listingId, className }) => {
    const { favoritesListingIds } = useSelector((state: RootState) => state.listings)
    const dispatch = useAppDispatch()

    const isFavorited = useMemo(() => {
        return favoritesListingIds.includes(listingId)
    }, [listingId, favoritesListingIds])

    const handleClick: MouseEventHandler = e => {
        e.preventDefault()

        if (isFavorited) {
            return dispatch(removeFavoriteListing(listingId))
        }

        dispatch(addFavoriteListing(listingId))
    }

    return (
        <>
            <Button
                className={className}
                onClick={handleClick}
                variant={"outline"}
            >
                <Heart
                    className={cn(
                        "h-4 w-4",
                        { 'fill-primary text-primary': isFavorited }
                    )}
                />
            </Button>
        </>
    )
}

export default ListingFavoriteButton;