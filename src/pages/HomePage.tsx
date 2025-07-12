import ListingList from "@/features/listing/components/ListingList";
import { listings } from "@/api/data/listings.js"
import type { Listing } from "@/features/listing/types";

const typedListings = listings as Listing[]

const HomePage: React.FC = () => {

    return (
        <>
            <div className="container py-4">
                <ListingList listings={typedListings} />
            </div>
        </>
    )
}

export default HomePage;