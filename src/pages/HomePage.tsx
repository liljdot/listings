import ListingList from "@/features/listing/components/ListingList";
import { useCallback, useState } from "react";
import ListingFilters from "@/features/listing/components/ListingFilters";
import type { DateRange } from "react-day-picker";
import { Separator } from "@/components/ui";
import DataRenderer from "@/features/shared/components/DataRenderer";
import { useGetListingsQuery } from "@/services/api/listingsApi";
import type { AxiosError } from "axios";

const HomePage: React.FC = () => {
    const [filters, setFilters] = useState<{ search: string, guests: number, dates?: DateRange }>()

    const { data: listings, isLoading, error, isFetching } = useGetListingsQuery(filters)

    const handleFiltersChange = useCallback((newFilters: { search: string, guests: number, dates?: DateRange }) => {
        setFilters(newFilters)
    }, [])

    return (
        <>
            <div className="container py-4" data-testid="homepage">
                <div className="mb-4">
                    <ListingFilters onChange={handleFiltersChange} />
                    <Separator className="my-4" />
                </div>
                <DataRenderer
                    isLoading={isLoading || isFetching}
                    error={error ? (error as AxiosError).message : null}
                >
                    <ListingList listings={listings || []} />
                </DataRenderer>
            </div>
        </>
    )
}

export default HomePage;