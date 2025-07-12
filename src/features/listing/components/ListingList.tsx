import type { Listing } from "../types";
import ListingCard from "./ListingCard";

interface Props {
    listings: Listing[]
}

const ListingList: React.FC<Props> = ({ listings }) => {

    return (
        <>
            <div>
                <h2>Listing List</h2>
                {
                    listings.map(listing => (<ListingCard listing={listing} />))
                }
            </div>
        </>
    )
}

export default ListingList