import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Separator } from "@/components/ui";
import { Link } from "react-router-dom";
import { useAuthContext } from "../auth/contexts/AuthProvider";
// @ts-expect-error import from js file
import api from "@/api";
import type { AxiosInstance } from "axios";

const typedApi = api as AxiosInstance

const NavBar: React.FC = () => {
    const { setToken } = useAuthContext()

    const handleSignOut = () => {
        typedApi.post("/api/signout")
            .finally(() => {
                setToken(null)
            })
    }

    return (
        <>
            <div className="flex flex-row items-center justify-between gap-8 px-8 py-4">
                <Link to={"/"}>
                    Home
                </Link>
                <div className="flex-end flex flex-row items-center gap-8">
                    <Link to={"/favorites"}>
                        Favorites
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Link to={""}>
                                Account
                            </Link>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleSignOut}>
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Separator />
        </>
    )
}

export default NavBar;