import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage";
import App from "./App";
import ListingDetailsPage from "./pages/ListingDetailsPage";

const Router: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <HomePage />
                },
                {
                    path: "/listing/:listingId",
                    element: <ListingDetailsPage />
                }
            ]
        }
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Router;