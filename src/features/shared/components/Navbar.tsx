import { Separator } from "@/components/ui";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {

    return (
        <>
            <div className="flex flex-row justify-center gap-8 px-8 py-4">
                <Link to={"/"}>
                    Home
                </Link>
                <Link to={"/favorites"}>
                    Favorites
                </Link>
                <Separator />
            </div>
        </>
    )
}

export default NavBar;