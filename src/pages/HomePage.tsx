import ListingList from "@/features/listing/components/ListingList";
// @ts-expect-error import from js file
import { listings } from "@/api/data/listings.js"
import type { Listing } from "@/features/listing/types";
import { useState } from "react";

const typedListings = listings as Listing[]

const HomePage: React.FC = () => {
    const [displayedListings, setDisplayedListings] = useState(typedListings)

    return (
        <>
            <div className="container py-4">
                <ListingList listings={displayedListings} />
            </div>
        </>
    )
}

export default HomePage;