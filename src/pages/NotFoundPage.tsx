import { Button, Card } from "@/components/ui";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {

    return (
        <>
            <div className="container flex h-screen w-screen items-center justify-center py-4 text-center">
                <Card className="p-8">
                    <h1>
                        Page not found
                    </h1>
                    <p className="pb-2">
                        Unfortunately, the page that you're looking for does not exist.
                    </p>
                    <Button asChild>
                        <Link
                            to={"/"}
                            replace
                        >
                            Back to Home
                        </Link>
                    </Button>
                </Card>
            </div>
        </>
    )
}

export default NotFoundPage;