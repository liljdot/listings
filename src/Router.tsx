import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage";

const Router: React.FC = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />
        }
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Router;