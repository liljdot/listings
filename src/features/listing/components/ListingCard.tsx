import type { Listing } from "../types";

interface Props {
    listing: Listing
}

const ListingCard: React.FC<Props> = () => {

    return (
        <>
            <h3>Listing Card</h3>
        </>
    )
}

export default ListingCard;