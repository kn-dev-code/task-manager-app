import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./components/navbar";
import Dashboard from "./components/dashboard";

export function App() {
  return (
    <BrowserRouter>
    <NavBar/>
     <Routes>
     <Route path = "/" element = {<Dashboard/>}/>
     </Routes>
    </BrowserRouter>
    
  )
}

export default App
