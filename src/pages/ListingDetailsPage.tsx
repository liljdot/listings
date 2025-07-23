import { useParams } from "react-router-dom";
import ListingDetailsCard from "@/features/listing/components/ListingDetailsCard";
import useFetch from "@/features/listing/hooks/useFetch";
import type { ListingForList } from "@/features/listing/types";
import DataRenderer from "@/features/shared/components/DataRenderer";

const ListingDetailsPage: React.FC = () => {
    const { listingId } = useParams()

    const { data: listing, isLoading, error } = useFetch<ListingForList>(`/api/listings/${listingId}`, undefined, [listingId])

    return (
        <>
            <div className="container py-4">
                <DataRenderer
                    isLoading={isLoading}
                    error={error}
                >
                    <ListingDetailsCard listing={listing!} />
                </DataRenderer>
            </div>
        </>
    )
}

export default ListingDetailsPage;