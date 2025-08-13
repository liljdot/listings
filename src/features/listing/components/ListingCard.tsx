import { Card, CardContent, Separator } from "@/components/ui";
import type { ListingForList } from "../types";
import { DollarSign, Pin, Users } from "lucide-react";
import ListingCardImages from "./ListingCardImages";
import { Link } from "react-router-dom";
import ListingFavoriteButton from "./ListingFavoriteButton";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";
import UserAvater from "@/features/user/components/UserAvatar";
import ListingRatingStars from "./ListingRatingStars";

interface Props {
    listing: ListingForList
}

const ListingCard: React.FC<Props> = ({ listing }) => {
    const { users } = useSelector((state: RootState) => state.users)

    const listingUser = users[listing.userId]

    return (
        <Card className="w-[320px]">
            <div className="relative">
                <ListingCardImages listing={listing} />
                <ListingFavoriteButton
                    className="absolute right-4 top-4"
                    listingId={listing.id}
                />
                <ListingRatingStars
                    className="abslolute left-4 bottom-4"
                    listing={listing}
                />
            </div>
            <Link to={`/listing/${listing.id}`}>
                <CardContent className="flex flex-col gap-2 p-4">
                    <h2 className="mb-2 text-xl font-semibold">
                        {listing.name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">
                            <span className="font-bold text-foreground">{listing.price}</span>/night
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Pin className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">
                            <span className="font-bold text-foreground">
                                {listing.location.name}
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">
                            <span className="font-bold text-foreground">
                                {listing.maxGuests} Guests
                            </span>
                        </span>
                    </div>
                    {
                        listingUser && (
                            <>
                                <Separator className="my-4" />
                                <UserAvater user={listingUser} />
                            </>
                        )
                    }
                </CardContent>
            </Link >
        </Card >
    )
}

export default ListingCard;