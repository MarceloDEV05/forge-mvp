import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {Header} from "./components/Header";
import {CartDrawer} from "./components/CartDrawer";
import {Home} from "./pages/Home";
import {Catalog} from "./pages/Catalog";
import {Product} from "./pages/Product";
import {Admin} from "./pages/Admin";
import { StoreProvider } from "./store";

function Shell() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <Header onCart={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/produto/:id" element={<Product />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="footer">
        <div className="container footer-inner">
          <div className="logo">
            FORGE<span>.</span>
          </div>
          <p>
            FORGE Supplements © {new Date().getFullYear()} • Protótipo
            demonstrativo
          </p>
          <span>DISCIPLINA NUTRE RESULTADOS.</span>
        </div>
      </footer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
export const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </StoreProvider>
  );
}
