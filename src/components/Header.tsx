import { Menu, ShoppingBag, Search, UserRound, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../store";

export const Header = ({ onCart }: { onCart: () => void }) => {
  const { count } = useStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  
  return (
    <>
      <div className="topline">
        PERFORMANCE COMEÇA AQUI <span>•</span> ATENDIMENTO VIA WHATSAPP
      </div>
      <header className="header">
        <div className="container nav">
          <button
            className="icon-button mobile-only"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
          >
            {open ? <X /> : <Menu />}
          </button>
          <Link className="logo" to="/">
            FORGE<span>.</span>
          </Link>
          <nav
            className={open ? "links open" : "links"}
            onClick={() => setOpen(false)}
          >
            <NavLink to="/">Início</NavLink>
            <NavLink to="/catalogo">Suplementos</NavLink>
            <NavLink to="/catalogo">Categorias</NavLink>
            <NavLink to="/admin">Painel admin</NavLink>
          </nav>
          <form
            className="search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/catalogo?q=" + encodeURIComponent(query));
            }}
          >
            <Search size={17} />
            <input
              aria-label="Buscar produtos"
              placeholder="Buscar suplementos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <div className="nav-actions">
            <Link
              className="icon-button desktop-only"
              to="/admin"
              title="Painel administrativo"
            >
              <UserRound size={20} />
            </Link>
            <button
              className="icon-button cart-icon"
              onClick={onCart}
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={21} />
              {count > 0 && <span>{count}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
