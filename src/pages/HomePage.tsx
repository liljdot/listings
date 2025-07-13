import ListingList from "@/features/listing/components/ListingList";
// @ts-expect-error import from js file
import { listings, isListingAvailable } from "@/api/data/listings.js"
import type { Listing } from "@/features/listing/types";
import { useState } from "react";
import ListingFilters from "@/features/listing/components/ListingFilters";
import { Separator } from "@radix-ui/react-separator";
import type { DateRange } from "react-day-picker";

const typedListings = listings as Listing[]

const HomePage: React.FC = () => {
    const [displayedListings, setDisplayedListings] = useState(typedListings)

    const handleFilters = (filters: {
        dates?: DateRange,
        guests?: number,
        search?: string
    }) => {
        const { dates, guests, search } = filters;

        // Resets filters by using static listings
        let filteredListings = typedListings;

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

        setDisplayedListings(filteredListings);
    }

    return (
        <>
            <div className="container py-4">
                <div className="mb-4">
                    <ListingFilters onChange={handleFilters} />
                    <Separator />
                </div>
                <ListingList listings={displayedListings} />
            </div>
        </>
    )
}

export default HomePage;