import type { User } from "../user/types"

export interface Listing {
    id: number
    userId: User["id"]
    name: string
    images: string[]
    maxGuests: number
    price: number
    description: string
}

interface ListingWithLocation extends Listing {
    location: {
        id: number
        country: string
        name: string
        createdAt: Date
        updatedAt: Date
    }
}

export type ListingForList = ListingWithLocation