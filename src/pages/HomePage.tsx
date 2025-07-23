import ListingList from "@/features/listing/components/ListingList";
import { useCallback, useEffect, useState } from "react";
import ListingFilters from "@/features/listing/components/ListingFilters";
import type { DateRange } from "react-day-picker";
import { Separator } from "@/components/ui";
import DataRenderer from "@/features/shared/components/DataRenderer";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "@/state/store";
import { fetchListings } from "@/state/slices/listingsSlices";

const HomePage: React.FC = () => {
    const [filters, setFilters] = useState<{ search: string, guests: number, dates?: DateRange }>()

    const dispatch = useAppDispatch()

    const { listings, isLoading, error } = useSelector((state: RootState) => state.listings)

    const handleFiltersChange = useCallback((newFilters: { search: string, guests: number, dates?: DateRange }) => {
        setFilters(newFilters)
    }, [])

    useEffect(() => {
        const request = dispatch(fetchListings(filters))

        return request.abort
    }, [filters, dispatch])

    return (
        <>
            <div className="container py-4">
                <div className="mb-4">
                    <ListingFilters onChange={handleFiltersChange} />
                    <Separator className="my-4" />
                </div>
                <DataRenderer
                    isLoading={isLoading}
                    error={error}
                >
                    <ListingList listings={listings || []} />
                </DataRenderer>
            </div>
        </>
    )
}

export default HomePage;