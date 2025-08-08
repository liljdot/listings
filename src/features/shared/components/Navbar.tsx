import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Separator } from "@/components/ui";
import { Link } from "react-router-dom";
import { useAuthContext } from "../auth/contexts/AuthProvider";
import { Laptop, LogOutIcon, Moon, Sun, User } from "lucide-react";
import { useThemeContext } from "../theme/contexts/ThemeProvider";
import { useSignOutMutation } from "@/services/api/authApi";


const NavBar: React.FC = () => {
    const { setToken, setUser } = useAuthContext()
    const { setTheme } = useThemeContext()
    const [mutate] = useSignOutMutation()

    const handleSignOut = () => {
        mutate(undefined).unwrap()
            .finally(() => {
                setToken(null)
                setUser(null)
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
                            <DropdownMenuItem asChild>
                                <Link to={"/profile"}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleSignOut}>
                                <LogOutIcon className="mr-2 h-4 w-4" />
                                <span>Sign Out</span>
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <Sun className="mr-2 h-4 w-4" />
                                    <span>Theme</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        <Sun className="mr-2 h-4 w-4" />
                                        <span>Light</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        <Moon className="mr-2 h-4 w-4" />
                                        <span>Dark</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        <Laptop className="mr-2 h-4 w-4" />
                                        <span>System</span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Separator />
        </>
    )
}

export default NavBar;