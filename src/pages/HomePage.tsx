import ListingList from "@/features/listing/components/ListingList";
import type { ListingForList } from "@/features/listing/types";
import { useCallback, useState } from "react";
import ListingFilters from "@/features/listing/components/ListingFilters";
import type { DateRange } from "react-day-picker";
import { Separator } from "@/components/ui";
import useFetch from "@/features/listing/hooks/useFetch";
import DataRenderer from "@/features/shared/DataRenderer";

const HomePage: React.FC = () => {
    const [filters, setFilters] = useState<{ search: string, guests: number, dates?: DateRange }>()

    const { data: listings, isLoading, error } = useFetch<ListingForList[]>("/api/listings", filters)

    const handleFiltersChange = useCallback((newFilters: { search: string, guests: number, dates?: DateRange }) => {
        setFilters(newFilters)
    }, [])

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