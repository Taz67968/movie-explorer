import "./App.css";
import Details from "./pages/details";
import Home from "./pages/Home";
import Series from "./pages/Series";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Series" element={<Series />} />
          <Route path="/Details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
