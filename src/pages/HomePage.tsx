import ListingList from "@/features/listing/components/ListingList";

const HomePage: React.FC = () => {

    return (
        <>
            <div>
                <h1>HomePage</h1>
                <ListingList listings={[]} />
            </div>
        </>
    )
}

export default HomePage;