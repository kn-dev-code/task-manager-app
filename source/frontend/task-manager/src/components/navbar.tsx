import { Button } from "./ui/button"


const NavBar = () => {
  return (
    <div className = "bg-linear-to-r from-[#A1A1A1] via-[#818181] to-[#3B3B3B] h-15 flex flex-row justify-between items-center">
      <h1 className = "text-lg font-bold pl-15">Taskify</h1>
      <div className = "flex flex-row gap-3 pr-2">
  <Button className = "w-25 h-9 text-[#EA7474] text-md font-bold bg-[#D9D9D9]">Sign Up</Button>
      <Button className = "w-25 h-9 text-[#EA7474] text-md font-bold bg-[#D9D9D9]">Log In</Button>
      </div>
    </div>
  )
}

export default NavBar
