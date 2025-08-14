import { cn } from "@/lib/utils";
import type { ReviewForList } from "../types";
import { Star } from "lucide-react";

interface Props {
    review: ReviewForList
    className?: string
}

const ReviewCardStars: React.FC<Props> = ({ review, className }) => {

    return (
        <>
            <div className={cn(
                "inline-flex flex-row items-center",
                className
            )}>
                {
                    [...Array(5)].map((...[, index]) => (
                        <Star
                            key={index}
                            className={cn(
                                "h-5 w-5 fill-secondary text-secondary",
                                { "fill-star text-star": index < review.rating }
                            )}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default ReviewCardStars;