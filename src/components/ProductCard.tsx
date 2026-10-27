import { ShoppingCart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { money } from "../data";
import { useStore } from "../store";
import type { Product } from "../types";


export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useStore();

  return (
    <article className="product-card">
      
      <Link to={"/produto/" + product.id} className="product-image">
        {product.tag && product.stock > 0 && (
          <span className="product-tag">{product.tag}</span>
        )}
        {product.stock === 0 && <span className="sold-tag">ESGOTADO</span>}
        <img src={product.image} alt={product.name} />
        <ArrowUpRight className="image-arrow" size={17} />
      </Link>

      <div className="product-info">
        <span className="eyebrow muted">{product.category}</span>

        <Link to={"/produto/" + product.id} className="product-name">
          {product.name}
        </Link>

        <div className="stars">
          ★★★★★ <small>(128)</small>
        </div>

        <div className="product-bottom">

          <div>
            <strong>{money(product.price)}</strong>
            <small>ou no atendimento</small>
          </div>
          
          <button
            disabled={product.stock === 0}
            onClick={() => add(product.id)}
            aria-label={"Adicionar " + product.name + " ao carrinho"}
            className="add-button"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
