import Container from "./components/Container"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"

function App() {
  
return <>
    <Header/>
    <Container>
        <Routes>
            <Route index element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
            <Route path="/books" element={<Books/>}></Route>
        </Routes>
    </Container>
    <Footer/>

    

</>

}

export default App
