import { useParams } from "react-router-dom";
import ListingDetailsCard from "@/features/listing/components/ListingDetailsCard";
import { Spinner } from "@/components/ui";
import useFetch from "@/features/listing/hooks/useFetch";
import type { ListingForList } from "@/features/listing/types";

const ListingDetailsPage: React.FC = () => {
    const { listingId } = useParams()

    const { data: listing, isLoading, error } = useFetch<ListingForList>(`/api/listings/${listingId}`, undefined, [listingId])

    const renderListingDetails = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center">
                    <Spinner size={"sm"} />
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center">
                    {error}
                </div>
            );
        }

        return (
            <ListingDetailsCard listing={listing!} />
        )
    }

    return (
        <>
            <div className="container py-4">
                {
                    renderListingDetails()
                }
            </div>
        </>
    )
}

export default ListingDetailsPage;