import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import { Spinner } from "@/components/ui";

const RequireAuth: React.FC = () => {
    const { token } = useAuthContext()

    if (token === null) {
        return (
            <Navigate
                to={"/signin"}
                replace
            />
        )
    }

    if (token === undefined) {
        return (
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default RequireAuth;