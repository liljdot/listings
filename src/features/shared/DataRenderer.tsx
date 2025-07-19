import { Spinner } from "@/components/ui";
import type { ReactNode } from "react";

interface Props {
    isLoading?: boolean;
    error: string | null
    children: ReactNode
}

const DataRenderer: React.FC<Props> = ({ isLoading, error, children }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center">
                <Spinner size={"sm"} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center">
                {error}
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    )
}

export default DataRenderer