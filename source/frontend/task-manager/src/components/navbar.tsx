import { Button } from "./ui/button"
import {Link} from "react-router-dom"

const NavBar = () => {
  return (
    <div className = "bg-linear-to-r from-[#A1A1A1] via-[#818181] to-[#3B3B3B] brightness-110 h-15 flex flex-row justify-between items-center">
      <Link to = "/"><h1 className = "text-lg font-bold pl-15 cursor-pointer">Taskify</h1></Link>
      <div className = "flex flex-row gap-3 pr-2">
  <Link to = "/sign-up"><Button className = "w-25 h-9 text-[#EA7474] text-md font-bold bg-[#D9D9D9] cursor-pointer hover:scale-105">Sign Up</Button></Link>
      <Link to = "/sign-in"><Button className = "w-25 h-9 text-[#EA7474] text-md font-bold bg-[#D9D9D9] cursor-pointer hover:scale-105">Log In</Button></Link>
      </div>
    </div>
  )
}

export default NavBar
