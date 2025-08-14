import { useParams } from "react-router-dom";
import ListingDetailsCard from "@/features/listing/components/ListingDetailsCard";
import DataRenderer from "@/features/shared/components/DataRenderer";
import { useGetSingleListingQuery } from "@/services/api/listingsApi";
import type { AxiosError } from "axios";
import { useGetListingReviewsQuery } from "@/services/api/reviewsApi";
import ReviewsList from "@/features/review/components/ReviewsList";

const ListingDetailsPage: React.FC = () => {
    const { listingId } = useParams()

    const { data: listing, isLoading, error } = useGetSingleListingQuery(Number(listingId))

    const { data: reviews = [], isLoading: getReviewsIsLoading, error: getReviewsError } = useGetListingReviewsQuery(Number(listingId))

    return (
        <>
            <div className="container py-4">
                <div className="mb-8">
                    <DataRenderer
                        isLoading={isLoading}
                        error={error ? (error as AxiosError).message : null}
                    >
                        <ListingDetailsCard listing={listing!} />
                    </DataRenderer>
                    {
                        listing && (
                            <div>
                                <h2 className="mb-4">Reviews</h2>
                                <DataRenderer
                                    isLoading={getReviewsIsLoading}
                                    error={getReviewsError ? (getReviewsError as AxiosError).message : null}
                                >
                                    <ReviewsList reviews={reviews} />
                                </DataRenderer>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ListingDetailsPage;