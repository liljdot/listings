import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"
import type { User } from "../types"
import { getUserDisplayName } from "../fns"

interface Props {
    className?: string
    imageOnly?: boolean
    user: User
}

const UserAvater: React.FC<Props> = ({ className, imageOnly, user }) => {
    const displayName = getUserDisplayName(user)

    return (
        <div className="flex flex-row items-center gap-2">
            <Avatar className={className}>
                <AvatarImage
                    src={user.avatarUrl}
                    alt={displayName}
                />
                <AvatarFallback className="h-10 w-10 bg-secondary">
                    {user.initials}
                </AvatarFallback>
            </Avatar>

            {
                !imageOnly && (
                    <div>
                        <span>
                            {displayName}
                        </span>
                    </div>
                )
            }
        </div>
    )
}

export default UserAvater