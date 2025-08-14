import { useSelector } from "react-redux";
import type { ReviewForList } from "../types";
import type { RootState } from "@/state/store";
import { Card, CardContent, Separator } from "@/components/ui";
import ReviewCardStars from "./ReviewCardStars";
import UserAvater from "@/features/user/components/UserAvatar";

interface Props {
    review: ReviewForList
}

const ReviewCard: React.FC<Props> = ({ review }) => {
    const { users } = useSelector((state: RootState) => state.users)
    const reviewUser = users[review.userId]

    return (
        <>
            <Card className="pt-4">
                <CardContent>
                    <div className="mb-4 flex flex-row items-center justify-between">
                        <h3 className="mb-0">
                        </h3>
                        <ReviewCardStars review={review} />
                    </div>
                    <Separator className="mb-4" />
                    {
                        reviewUser && (
                            <>
                                <UserAvater user={reviewUser} />
                                <Separator className="my-4" />
                            </>
                        )
                    }
                    <div className="whitespace-pre-line">
                        {review.comment}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ReviewCard;