import { Button } from "./ui/button"
import {Link} from "react-router-dom"
const Dashboard = () => {
  return (
    <div className = "h-screen bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] brightness-110 flex flex-col justify-center items-center gap-y-5 pb-15">
      <h1 className = "text-5xl">Welcome to <span className = "text-[#EA7474]">Taskify</span></h1>
      <Link to = "/sign-up"><Button className = "text-[#EA7474] bg-[#D9D9D9] font-bold w-60 h-15 text-md hover:scale-105 cursor-pointer">New to Taskify? Sign Up!</Button></Link>
    </div>
  )
}

export default Dashboard
