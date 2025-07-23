import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage";
import App from "./App";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ListingFavoritesPage from "./pages/ListingFavoritesPage";

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
                    path: "/favorites",
                    element: <ListingFavoritesPage />
                },
                {
                    path: "/listing/:listingId",
                    element: <ListingDetailsPage />
                }
            ],
            errorElement: <NotFoundPage />
        }
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Router;