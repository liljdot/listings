export interface Listing {
    id: number
    name: string
    images: string[]
    maxGuests: number
    price: number
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