import {
  X,
  Minus,
  Plus,
  Trash2,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

import { useStore } from "../store";
import { money } from "../data";

export const CartDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {

  const { products, cart, change, remove } = useStore();

  const items = cart.map((x) => ({ ...x, product: products.find((p) => p.id === x.id) }))
  .filter((x) => x.product !== undefined);

  const total = items.reduce((n, x) => n + x.product!.price * x.quantity, 0);

  const valid = items.length > 0 && items.every((x) => x.product!.stock >= x.quantity);

  const checkout = () => {
    if (!valid) return;
    const lines = items
      .map(
        (x) =>
          `• ${x.product!.name} (${x.quantity}x) - ${money(x.product!.price * x.quantity)}`,
      )
      .join("\n");


    const message = `Olá! Quero finalizar meu pedido FORGE:\n\n${lines}\n\nTotal: ${money(total)}\n\nGostaria de confirmar a disponibilidade e combinar pagamento e entrega.`;
    window.open(
      "https://wa.me/5511999999999?text=" + encodeURIComponent(message),
      "_blank",
      "noopener,noreferrer",
    );
  };
  
  return (
    <>
      {open && <div className="overlay" onClick={onClose} />}
      <aside
        className={"drawer " + (open ? "visible" : "")}
        aria-hidden={!open}
      >
        <div className="drawer-head">
          <div>
            <span className="eyebrow green">SEU PEDIDO</span>
            <h2>Carrinho</h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
            <X />
          </button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty">
              <ShoppingBag size={44} />
              <h3>Seu carrinho está vazio</h3>
              <p>Escolha seus suplementos favoritos.</p>
            </div>
          ) : (
            items.map((x) => (
              <div className="cart-line" key={x.id}>
                <img src={x.product!.image} alt="" />
                <div className="cart-line-info">
                  <strong>{x.product!.name}</strong>
                  <span>{money(x.product!.price)}</span>
                  <div className="quantity">
                    <button
                      onClick={() => change(x.id, -1)}
                      aria-label="Diminuir"
                    >
                      <Minus size={14} />
                    </button>
                    {x.quantity}
                    <button
                      onClick={() => change(x.id, 1)}
                      disabled={x.quantity >= x.product!.stock}
                      aria-label="Aumentar"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  {x.quantity > x.product!.stock && (
                    <small className="danger">Estoque insuficiente</small>
                  )}
                </div>
                <button
                  className="icon-button muted"
                  onClick={() => remove(x.id)}
                  aria-label="Remover"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="drawer-footer">
          <div className="total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>
          <p>Pagamento e entrega combinados diretamente pelo WhatsApp.</p>
          <button
            className="btn primary full"
            disabled={!valid}
            onClick={checkout}
          >
            <MessageCircle size={19} /> Finalizar via WhatsApp
          </button>
        </div>
      </aside>
    </>
  );
};
