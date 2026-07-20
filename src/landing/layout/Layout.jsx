import { Routes, Route,  } from "react-router-dom"
import Navbar from "./Navbar"
import Home from "../pages/Home"
import Features from "../pages/Features"
import HowItWorks from "../pages/HowItWorks"
import Pricing from "../pages/Pricing"
import Contact from "../pages/Contact"
import Footer from "./Footer"

function Layout() {
    return (
        <div className="bg-black">
            <Navbar/>
            <Routes>
                <Route path="/" element={ <Home/>}/>
                <Route path="/features" element={<Features/>}/>
                <Route path="/how-it-works" element={<HowItWorks/>}/>
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}
export default Layout