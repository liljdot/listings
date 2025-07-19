import ListingList from "@/features/listing/components/ListingList";
import type { ListingForList } from "@/features/listing/types";
import { useState } from "react";
import ListingFilters from "@/features/listing/components/ListingFilters";
import type { DateRange } from "react-day-picker";
import { Spinner, Separator } from "@/components/ui";
import useFetch from "@/features/listing/hooks/useFetch";

const HomePage: React.FC = () => {
    const [filters, setFilters] = useState<{ search: string, guests: number, dates?: DateRange }>()

    const { data: listings, isLoading, error } = useFetch<ListingForList[]>("/api/listings", filters)

    return (
        <>
            <div className="container py-4">
                <div className="mb-4">
                    <ListingFilters onChange={filters => setFilters(filters)} />
                    <Separator className="my-4" />
                </div>
                {
                    isLoading && (
                        <div className="flex justify-center">
                            <Spinner size={"sm"} />
                        </div>
                    )
                }
                {
                    error && (
                        <div className="text-center">
                            {error}
                        </div>
                    )
                }
                {
                    !error &&
                    !isLoading &&
                    <ListingList listings={listings || []} />
                }
            </div>
        </>
    )
}

export default HomePage;