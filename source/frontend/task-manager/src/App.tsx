import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./components/navbar";
import Dashboard from "./components/dashboard";
import SignUp from "./pages/auth/sign-up";
import SignIn from "./pages/auth/sign-in";
import {Toaster} from "sonner";
import Task from "./tasks/components/task";
import Subscription from "./pages/subscription/subscription";
import PaymentPage from "./pages/subscription/payment";

export function App() {

return (
<BrowserRouter>
<NavBar/>
<Toaster className = "fixed" position = "bottom-right" richColors/>
<Routes>
<Route path = "/" element = {<Dashboard/>}/>
<Route path = "/sign-up" element = {<SignUp/>}/>
<Route path = "/sign-in" element = {<SignIn/>}/>
<Route path = "/tasks" element = {<Task/>}/>
<Route path = "/subscription" element = {<Subscription/>}/>
<Route path = "/subscription-plan" element = {<PaymentPage/>}/>
</Routes>
</BrowserRouter>

)
}

export default App