import { Card, Separator } from "@/components/ui";
import type { ListingForList } from "../types"
import { DollarSign, Pin, Users } from "lucide-react";
import ListingDetailsCardImages from "./ListingDetailsCardImages";
import ListingFavoriteButton from "./ListingFavoriteButton";
import { useSelector } from "react-redux";
import type { RootState } from "@/state/store";
import UserAvater from "@/features/user/components/UserAvatar";

interface Props {
    listing: ListingForList
}

const ListingDetailsCard: React.FC<Props> = ({ listing }) => {
    const { users } = useSelector((state: RootState) => state.users)

    const listingUser = users[listing.userId]

    return (
        <>
            <Card className="mx-auto p-4">
                <ListingDetailsCardImages listing={listing} />
                <Separator className="mb-4" />
                <div className="flex justify-between">
                    <div className='flex flex-col gap-2'>
                        <h1 className="mb-2 text-2xl font-bold">
                            {listing.name}
                        </h1>
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">
                                <span className="font-bold text-foreground">
                                    {listing.price} / night
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Pin className="h-4 w-4 text-primary" />
                            <span className='text-muted-foreground'>
                                {listing.location.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span className='text-muted-foreground'>
                                {listing.maxGuests} Guests
                            </span>
                        </div>
                    </div>
                    <ListingFavoriteButton listingId={listing.id} />
                </div>
                {
                    listingUser && (
                        <>
                            <Separator className="my-4" />
                            <UserAvater user={listingUser} />
                        </>
                    )
                }
                <Separator className="my-4" />
                <div className="whitespace-pre-line">
                    {listing.description}
                </div>
            </Card>

        </>
    )
}

export default ListingDetailsCard;