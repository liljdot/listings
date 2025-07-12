import type { Listing } from "../types";
import ListingCard from "./ListingCard";

interface Props {
    listings: Listing[]
}

const ListingList: React.FC<Props> = ({listings}) => {

    return (
        <>
         {
            listings.map(listing => (<ListingCard listing={listing}/>))
         }
        </>
    )
}

export default ListingList