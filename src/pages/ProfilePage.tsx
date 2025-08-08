import { Card, CardContent } from "@/components/ui";
import ListingList from "@/features/listing/components/ListingList";
import { useAuthContext } from "@/features/shared/auth/contexts/AuthProvider";
import DataRenderer from "@/features/shared/components/DataRenderer";
import UserAvater from "@/features/user/components/UserAvatar";
import { getUserDisplayName } from "@/features/user/fns";
import { useGetListingsQuery } from "@/services/api/listingsApi";
import type { AxiosError } from "axios";
import { useMemo } from "react";

const ProfilePage: React.FC = () => {
    const { user } = useAuthContext()

    const { data: listings, isLoading, error } = useGetListingsQuery(undefined)

    const userListings = useMemo(() => {
        if (!listings) {
            return []
        }

        return listings?.filter(listing => listing.userId == user?.id)
    }, [listings, user?.id])

    const displayName = user ? getUserDisplayName(user) : "User"

    return (
        <>
            <div className="container py-4">
                <div className="mb-4 flex flex-col items-center">
                    {
                        user && <UserAvater
                            className="mb-4 h-[150px] w-[150px]"
                            imageOnly
                            user={user}
                        />
                    }
                    <h1 className="text-center">
                        {displayName}
                    </h1>
                </div>
                <Card className="mb-8 pt-4">
                    <CardContent>
                        <div className="whitespace-pre-line">
                            {user?.bio}
                        </div>
                    </CardContent>
                </Card>
                <div>
                    <h2 className="mb-4">
                        Your Listings
                    </h2>
                    <DataRenderer
                        isLoading={isLoading}
                        error={error ? (error as AxiosError).message : null}
                    >
                        <ListingList listings={userListings} />
                    </DataRenderer>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;