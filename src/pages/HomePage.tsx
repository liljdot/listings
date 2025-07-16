import ListingList from "@/features/listing/components/ListingList";
// @ts-expect-error import from js file
import api from "@/api"
import type { ListingForList } from "@/features/listing/types";
import { useEffect, useRef, useState } from "react";
import ListingFilters from "@/features/listing/components/ListingFilters";
import type { DateRange } from "react-day-picker";
import { Spinner, Separator } from "@/components/ui";
import type { AxiosInstance } from "axios";
import axios from "axios";

const typedApi = api as AxiosInstance

const HomePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const [listings, setListings] = useState<ListingForList[]>([])
    const [filters, setFilters] = useState<{ search: string, guests: number, dates?: DateRange }>()

    const abortController = useRef<AbortController>(null)

    useEffect(() => {
        abortController.current = new AbortController()

        const fetchListings = () => {
            setIsLoading(true)
            setIsError(false)

            return typedApi.get<ListingForList[]>("/api/listings", {
                params: filters,
                signal: abortController.current?.signal
            })
                .then(res => {
                    setListings(res.data)
                    if (Math.random() > 0.8) {
                        throw new Error()
                    }
                })
                .catch((err) => {
                    if (axios.isCancel(err)) {
                        return
                    }

                    setIsError(true)
                })
                .then(() => {
                    setIsLoading(false)
                })
        }

        fetchListings()

        return () => abortController.current?.abort()
    }, [filters])

    return (
        <>
            <div className="container py-4">
                <div className="mb-4">
                    <ListingFilters onChange={filters => setFilters(filters)} />
                    <Separator className="my-4" />
                </div>
                {
                    isLoading && (
                        <div className="flex justify-center">
                            <Spinner size={"sm"} />
                        </div>
                    )
                }
                {
                    isError && (
                        <div className="text-center">
                            Something went wrong...
                        </div>
                    )
                }
                {
                    !isError &&
                    !isLoading &&
                    <ListingList listings={listings} />
                }
            </div>
        </>
    )
}

export default HomePage;