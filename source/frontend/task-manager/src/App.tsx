import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./components/navbar";
import Dashboard from "./components/dashboard";
import SignUp from "./pages/auth/sign-up";
import SignIn from "./pages/auth/sign-in";
import Subscription from "./pages/subscription/Subscription";
import {Toaster} from "sonner";
import Task from "./components/task";

export function App() {

return (
<BrowserRouter>
<NavBar/>
<Toaster className = "fixed" position = "bottom-right" richColors/>
<Routes>
<Route path = "/" element = {<Dashboard/>}/>
<Route path = "/sign-up" element = {<SignUp/>}/>
<Route path = "/sign-in" element = {<SignIn/>}/>
<Route path = "/subscription" element={<Subscription/>}/>
<Route path = "/tasks" element = {<Task/>}/>
</Routes>
</BrowserRouter>

)
}

export default App