export interface Listing {
    id: number
    name: string
    images: string[]
    maxGuests: number
    price: number
    location: {
        id: number
        country: string
        name: string
        createdAt: Date
        updatedAt: Date
    }
}