import { useParams } from "react-router-dom";
// @ts-expect-error import from js file
import api from "@/api"
import type { AxiosInstance } from "axios";
import type { ListingForList } from "@/features/listing/types";
import { useEffect, useState } from "react";
import ListingDetailsCard from "@/features/listing/components/ListingDetailsCard";
import { Spinner } from "@/components/ui";
import axios from "axios";

const typedApi = api as AxiosInstance

const ListingDetailsPage: React.FC = () => {
    const { listingId } = useParams()

    const [listing, setListing] = useState<ListingForList>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const abortController = new AbortController()

        const fetchListing = () => {
            setError(null)

            typedApi.get<ListingForList>(`/api/listings/${listingId}`, {
                signal: abortController.signal
            })
                .then(res => {
                    if (!res.data) {
                        throw new Error("Listing not found")
                    }

                    setListing(res.data)
                })
                .catch(err => {
                    if (axios.isCancel(err)) {
                        return
                    }

                    setError(err.message || err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }

        fetchListing()

        return () => abortController.abort()
    }, [listingId])

    return (
        <>
            <div className="container py-4">
                {
                    isLoading && (
                        <div className="flex justify-center">
                            <Spinner size={"sm"} />
                        </div>
                    )
                }

                {
                    error && (
                        <div className="text-center">
                            {error}
                        </div>
                    )
                }

                {
                    !isLoading &&
                    !error && (
                        <ListingDetailsCard listing={listing!} />
                    )
                }
            </div>
        </>
    )
}

export default ListingDetailsPage;