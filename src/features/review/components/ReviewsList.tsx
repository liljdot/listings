import type { ReviewForList } from "../types";
import ReviewCard from "./ReviewCard";

interface Props {
    reviews: ReviewForList[]
}

const ReviewsList: React.FC<Props> = ({ reviews }) => {

    return (
        <>
            <div className="flex flex-col gap-4">
                {
                    reviews.length
                        ? reviews.map(review => (<ReviewCard key={review.id} review={review} />))
                        : <p>No reviews found.</p>
                }
            </div>
        </>
    )
}

export default ReviewsList