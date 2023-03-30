import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CurrentConversionRates from "./pages/CurrentConversionRates";
import Conversions from "./components/Conversions";


function App() {
  
return <>
    <Header/>
    <Container>
        <Routes>
            <Route index element={<Home/>}></Route>
            <Route path="/currentconversionrates" element={<CurrentConversionRates/>}></Route>
            <Route path="/conversions" element={<Conversions/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
        </Routes>
    </Container>
    <Footer/>

</>
}

export default App
