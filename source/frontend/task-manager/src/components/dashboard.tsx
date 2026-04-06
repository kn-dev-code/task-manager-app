import { Button } from "./ui/button"
import {Link} from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
const Dashboard = () => {
  const {user} = useAuth();
  return (
    <div className = "h-screen bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] brightness-110 flex flex-col justify-center items-center gap-y-5 pb-15">
      {user ? (
        <>
        <h1 className = "text-5xl">Welcome back, <span className = "text-[#EA7474]">{user.name}!</span></h1>
        <Link to = ""><Button className = "w-40 h-12 text-[#EA7474] text-md font-bold bg-[#D9D9D9] cursor-pointer hover:scale-105">View Tasks</Button></Link>
        </>
      ) : (
        <>
 <h1 className = "text-5xl">Welcome to <span className = "text-[#EA7474]">Taskify</span></h1>
      <Link to = "/sign-up"><Button className = "text-[#EA7474] bg-[#D9D9D9] font-bold w-60 h-15 text-md hover:scale-105 cursor-pointer">New to Taskify? Sign Up!</Button></Link>
      </>
      )} 
    </div>
  )
};

export default Dashboard
