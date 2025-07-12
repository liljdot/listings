import type { Listing } from "../types";
import ListingCard from "./ListingCard";

interface Props {
    listings: Listing[]
}

const ListingList: React.FC<Props> = ({ listings }) => {

    return (
        <>
            <h2>Listing List</h2>
            {
                listings.map(listing => (<ListingCard listing={listing} />))
            }
        </>
    )
}

export default ListingList