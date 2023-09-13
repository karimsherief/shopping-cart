import { Routes, Route } from "react-router-dom";
import { Home, Store, About } from "./pages";
import { Navbar } from "./components";
import { Container } from "react-bootstrap";
import ShoppingCartProvider from "./context/ShoppingCartContext";
function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
    
  );
}

export default App;
