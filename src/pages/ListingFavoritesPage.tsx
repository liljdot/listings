import ListingList from "@/features/listing/components/ListingList";
import DataRenderer from "@/features/shared/components/DataRenderer";
import { useGetListingsQuery } from "@/services/api/listingsApi";
import type { RootState } from "@/state/store";
import type { AxiosError } from "axios";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const ListingFavoritesPage: React.FC = () => {
    const { favoritesListingIds } = useSelector((state: RootState) => state.listings)

    const { data: listings, isLoading, error } = useGetListingsQuery(undefined)

    const favoriteListings = useMemo(() => {
        if (!listings) {
            return []
        }

        return listings.filter(listing => favoritesListingIds.includes(listing.id))
    }, [favoritesListingIds, listings])

    return (
        <>
            <div className="container py-4">
                <DataRenderer
                    isLoading={isLoading}
                    error={error ? (error as AxiosError).message : null}
                >
                    <ListingList listings={favoriteListings} />
                </DataRenderer>
            </div>
        </>
    )
}

export default ListingFavoritesPage;