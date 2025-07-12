import ListingList from "@/features/listing/components/ListingList";

const HomePage: React.FC = () => {

    return (
        <>
            <div className="container py-4">
                <h1>HomePage</h1>
                <ListingList listings={[]} />
            </div>
        </>
    )
}

export default HomePage;