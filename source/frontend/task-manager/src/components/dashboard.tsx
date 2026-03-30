import { Button } from "./ui/button"

const Dashboard = () => {
  return (
    <div className = "h-screen bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)]">
      <h1>Welcome to <h1 className = "text-[#EA7474]">Taskify</h1></h1>
      <Button className = "text-[#EA7474] bg-[#D9D9D9] font-bold">New To Taskify? Sign Up!</Button>
    </div>
  )
}

export default Dashboard
