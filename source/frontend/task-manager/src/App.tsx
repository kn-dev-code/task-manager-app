import {BrowserRouter, Routes, Route} from "react-router-dom";

import NavBar from "./components/navbar";

import Dashboard from "./components/dashboard";

import SignUp from "./pages/auth/sign-up";



export function App() {

return (
<BrowserRouter>
<NavBar/>
<Routes>
<Route path = "/" element = {<Dashboard/>}/>
<Route path = "/sign-up" element = {<SignUp/>}/>
</Routes>
</BrowserRouter>
)
}

export default App