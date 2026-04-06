import { Button } from "./ui/button"
import {Link} from "react-router-dom"
import { useAuth } from "@/hooks/use-auth";
import {useState} from "react";
import { toast } from "sonner";



const NavBar = () => {
const { user, logout } = useAuth();
const [isLoggingOut, setIsLoggingOut] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);





const handleLogout = async () => {
setIsLoggingOut(true);
try {
await logout();
toast.success("Logged out successfully!");
setShowConfirm(false);
} catch(e) {
console.error("Logout error:", e);
} finally {
setIsLoggingOut(false);
  }
}

return (

<div className="bg-linear-to-r from-[#A1A1A1] via-[#818181] to-[#3B3B3B] brightness-110 h-15 flex flex-row justify-between items-center">

<Link to="/">

<h1 className="text-lg font-bold pl-15 cursor-pointer">Taskify</h1>

</Link>


<div className="flex flex-row gap-3 pr-2 items-center">
  {user ? (
    <>
      {!showConfirm ? (
        <>
          <span className="text-white font-semibold pr-4">Hello, {user.name}</span>
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