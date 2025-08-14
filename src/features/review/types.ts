import type { Listing } from "../listing/types"
import type { User } from "../user/types"

export interface Review {
    id: number
    userId: User["id"]
    listingId: Listing["id"]
    rating: number
    comment: string
    createdAt: Date
    modifiedAt: Date
}

export type ReviewForList = Review