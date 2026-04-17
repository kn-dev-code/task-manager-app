import { Button } from "./ui/button"
import {Link} from "react-router-dom"
import { useAuth } from "@/hooks/use-auth";
import {useState} from "react";
import taskLogo from "@/assets/task-icon.jpeg";

const NavBar = () => {
const { user, logout } = useAuth();
const [isLoggingOut, setIsLoggingOut] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);





const handleLogout = async () => {
setIsLoggingOut(true);
try {
await logout();
setShowConfirm(false);
} catch(e) {
console.error("Logout error:", e);
} finally {
setIsLoggingOut(false);
  }
}

return (
<div className="bg-linear-to-r from-[#A1A1A1] via-[#818181] to-[#3B3B3B] brightness-110 h-15 flex flex-row justify-between items-center">
  <div className = "flex flex-row items-center gap-2">
  <Link to = "/" className = "hover:scale-105 transition-all"><img className = "w-12 h-11 rounded-[15px] ml-5"src = {taskLogo}/></Link>
<Link to="/"><h1 className="text-lg font-bold pl-1 cursor-pointer place-items-start">Taskify</h1></Link>
  </div>

<div className="flex flex-row gap-3 pr-2 items-center">
  {user ? (
    <>
      {!showConfirm ? (
        <>
          <Link className = "hover:cursor-pointer hover:scale-105 w-25 h-9 text-white font-bold" to = "/subscription"><Button className = "bg-linear-to-r from-[#DA6767] to-[#8BC0FC] w-25 h-9 rounded-2xl hover:cursor-pointer hover:scale-105 text-white font-bold">Upgrade</Button></Link>
          <span className="text-white font-semibold">Hello, {user.name}</span>
          <Button 
            onClick={() => setShowConfirm(true)} 
            className="w-25 h-9 text-[#EA7474] text-md font-bold bg-[#D9D9D9] cursor-pointer hover:scale-105"
          >
            Log Out
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-2 bg-black/20 p-2 rounded-md">
          <span className="text-white text-sm font-bold">Are you sure?</span>
          <Button 
            disabled={isLoggingOut}
            onClick={handleLogout} 
            className="bg-red-500 text-white px-3 h-8 text-xs font-bold hover:bg-red-600 cursor-pointer"
          >
            {isLoggingOut ? "..." : "Yes"}
          </Button>
          <Button 
            onClick={() => setShowConfirm(false)} 
            className="bg-[#D9D9D9] text-[#4d4d4d] px-3 h-8 text-xs font-bold hover:bg-white cursor-pointer"
          >
            No
          </Button>
        </div>
      )}
    </>
  ) : (
    <>
      <Link to="/sign-up">
        <Button className="w-25 h-9 text-[#EA7474] text-md font-bold bg-[#D9D9D9] cursor-pointer hover:scale-105">
          Sign Up
        </Button>
      </Link>
      <Link to="/sign-in">
        <Button className="w-25 h-9 text-[#EA7474] text-md font-bold bg-[#D9D9D9] cursor-pointer hover:scale-105">
          Log In
        </Button>
      </Link>
    </>
  )}
    </div>
  </div>
);
};



export default NavBar;