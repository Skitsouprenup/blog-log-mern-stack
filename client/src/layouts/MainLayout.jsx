import { Outlet } from "react-router"
import Navbar from "../components/partials/Navbar"

function MainLayout() {

  return (
  <main className="bg-neutral-200 h-[100%]">
    <Navbar />
    <Outlet />
  </main>
  )
}

export default MainLayout
