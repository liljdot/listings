import ListingList from "@/features/listing/components/ListingList";
import type { RootState } from "@/state/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const ListingFavoritesPage: React.FC = () => {
    const { favoritesListingIds, listings } = useSelector((state: RootState) => state.listings)

    const favoriteListings = useMemo(() => {
        return listings.filter(listing => favoritesListingIds.includes(listing.id))
    }, [favoritesListingIds, listings])

    return (
        <>
            <div className="container py-4">
                <ListingList listings={favoriteListings} />
            </div>
        </>
    )
}

export default ListingFavoritesPage;