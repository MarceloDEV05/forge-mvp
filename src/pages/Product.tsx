import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowLeft,
  ShieldCheck,
  Truck,
  MessageCircle,
} from "lucide-react";
import { useStore } from "../store";
import { money } from "../data";
export const Product = () => {
  const { id } = useParams();
  const { products, add } = useStore();
  const p = products.find((x) => x.id === id);
  if (!p)
    return (
      <main className="container section">
        <h2>Produto não encontrado</h2>
        <Link to="/catalogo">Voltar ao catálogo</Link>
      </main>
    );
  return (
    <main className="container detail">
      <Link className="back" to="/catalogo">
        <ArrowLeft size={17} /> Voltar ao catálogo
      </Link>
      <div className="detail-grid">
        <div className="detail-image">
          <img src={p.image} alt={p.name} />
        </div>
        <div className="detail-content">
          <span className="eyebrow green">{p.category.toUpperCase()}</span>
          <h1>{p.name}</h1>
          <div className="stars">
            ★★★★★ <small>Produto FORGE</small>
          </div>
          <p className="detail-description">{p.description}</p>
          <div className="detail-price">{money(p.price)}</div>
          <div className={p.stock ? "stock yes" : "stock no"}>
            {p.stock
              ? "● Em estoque (" + p.stock + " unidades)"
              : "● Produto esgotado"}
          </div>
          <button
            className="btn primary full"
            disabled={!p.stock}
            onClick={() => add(p.id)}
          >
            <ShoppingCart size={20} />
            {p.stock ? "ADICIONAR AO CARRINHO" : "ESGOTADO"}
          </button>
          <div className="detail-benefits">
            <span>
              <ShieldCheck /> Qualidade
            </span>
            <span>
              <Truck /> Entrega a combinar
            </span>
            <span>
              <MessageCircle /> Suporte WhatsApp
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
