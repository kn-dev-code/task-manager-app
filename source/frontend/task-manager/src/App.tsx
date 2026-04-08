import {BrowserRouter, Routes, Route} from "react-router-dom";

import NavBar from "./components/navbar";

import Dashboard from "./components/dashboard";

import SignUp from "./pages/auth/sign-up";
import SignIn from "./pages/auth/sign-in";


export function App() {

return (
<BrowserRouter>
<NavBar/>
<Routes>
<Route path = "/" element = {<Dashboard/>}/>
<Route path = "/sign-up" element = {<SignUp/>}/>
<Route path = "/sign-in" element = {<SignIn/>}/>
</Routes>
</BrowserRouter>
)
}

export default App