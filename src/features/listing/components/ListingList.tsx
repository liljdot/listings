import type { ListingForList } from "../types";
import ListingCard from "./ListingCard";

interface Props {
    listings: ListingForList[]
}

const ListingList: React.FC<Props> = ({ listings }) => {

    return (
        <>
            <div className="flex flex-wrap justify-center gap-4">
                {
                    listings.length
                        ? listings.map(listing => (
                            <ListingCard
                                key={listing.id}
                                listing={listing}
                            />
                        ))
                        : (
                            <p>
                                No listings found.
                            </p>
                        )
                }
            </div>
        </>
    )
}

export default ListingList