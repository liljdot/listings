import { useParams } from "react-router-dom";
import ListingDetailsCard from "@/features/listing/components/ListingDetailsCard";
import DataRenderer from "@/features/shared/components/DataRenderer";
import { useGetSingleListingQuery } from "@/services/api/listingsApi";
import type { AxiosError } from "axios";

const ListingDetailsPage: React.FC = () => {
    const { listingId } = useParams()

    const { data: listing, isLoading, error } = useGetSingleListingQuery(Number(listingId))

    return (
        <>
            <div className="container py-4">
                <DataRenderer
                    isLoading={isLoading}
                    error={error ? (error as AxiosError).message : null}
                >
                    <ListingDetailsCard listing={listing!} />
                </DataRenderer>
            </div>
        </>
    )
}

export default ListingDetailsPage;