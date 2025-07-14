import ListingList from "@/features/listing/components/ListingList";
// @ts-expect-error import from js file
import { isListingAvailable } from "@/api/data/listings.js"
// @ts-expect-error import from js file
import api from "@/api"
import type { Listing } from "@/features/listing/types";
import { useEffect, useState } from "react";
import ListingFilters from "@/features/listing/components/ListingFilters";
import { Separator } from "@radix-ui/react-separator";
import type { DateRange } from "react-day-picker";
import { Spinner } from "@/components/ui";

const typedApi = api as Axios.AxiosInstance

const HomePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const [listings, setListings] = useState<Listing[]>([])

    const handleFilters = (filters: {
        dates?: DateRange,
        guests?: number,
        search?: string
    }) => {
        const { dates, guests, search } = filters;

        // Resets filters by using static listings
        let filteredListings = listings;

        // Handles date range
        if (dates) {
            filteredListings = filteredListings.filter((listing) =>
                isListingAvailable(listing, dates),
            );
        }

        // Handles guests
        if (guests) {
            filteredListings = filteredListings.filter(
                (listing) => guests <= listing.maxGuests,
            );
        }

        // Handles search
        if (search) {
            filteredListings = filteredListings.filter((listing) =>
                listing.name.toLowerCase().includes(search.toLowerCase()),
            );
        }

        setListings(filteredListings);
    }

    useEffect(() => {
        const fetchListings = () => {
            return typedApi.get<Listing[]>("/api/listings")
                .then(res => {
                    setListings(res.data)
                    if (Math.random() > 0.8) {
                        throw new Error()
                    }
                })
                .catch(() => {
                    setIsError(true)
                })
                .then(() => {
                    setIsLoading(false)
                })
        }

        fetchListings()
        return () => { }
    }, [])

    return (
        <>
            <div className="container py-4">
                <div className="mb-4">
                    <ListingFilters onChange={handleFilters} />
                    <Separator />
                </div>
                {
                    isLoading && <Spinner />
                }
                {
                    isError && <div>
                        Something went wrong...
                    </div>
                }
                {
                    !isError &&
                    !isLoading &&
                    <ListingList listings={listings} />
                }
            </div>
        </>
    )
}

export default HomePage;