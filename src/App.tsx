import { Outlet } from "react-router-dom"
import NavBar from "./features/shared/components/Navbar"
import { useAuthContext } from "./features/shared/auth/contexts/AuthProvider"

function App() {
  const { token } = useAuthContext()

  return (
    <>
      {
        token && <NavBar />
      }
      <Outlet />
    </>
  )
}

export default App
