import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Plus,
  PenLine,
  Trash2,
  X,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Search,
} from "lucide-react";
import { useStore } from "../store";
import { money, categories } from "../data";
import type { Product } from "../types";
const empty: Product = {
  id: "",
  name: "",
  category: "Whey Protein",
  price: 0,
  stock: 0,
  image: "/products/whey.svg",
  description: "",
  featured: false,
};
export const Admin = () => {
  const { products, save, deleteProduct, reset } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [section, setSection] = useState<"dashboard" | "products">("dashboard");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const stock = products.filter((p) => p.stock > 0).length;
  const sold = products.length - stock;
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.stock * p.price,
    0,
  );
  
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editing ||
      !editing.name.trim() ||
      !Number.isFinite(editing.price) ||
      editing.price < 0 ||
      !Number.isInteger(editing.stock) ||
      editing.stock < 0
    )
      return;
    save({
      ...editing,
      id: editing.id || crypto.randomUUID(),
      name: editing.name.trim(),
    });
    setEditing(null);
  };

  return (
    <main className="admin">
      <aside className="admin-side">
        <div className="logo">
          FORGE<span>.</span>
          <small>ADMIN</small>
        </div>
        <button
          className={
            section === "dashboard" ? "admin-link selected" : "admin-link"
          }
          onClick={() => setSection("dashboard")}
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button
          className={
            section === "products" ? "admin-link selected" : "admin-link"
          }
          onClick={() => setSection("products")}
        >
          <Package size={18} /> Produtos
        </button>
        <div className="admin-side-bottom">
          <button
            className="admin-link"
            onClick={() => {
              if (
                window.confirm("Restaurar todos os produtos de demonstração?")
              )
                reset();
            }}
          >
            <RotateCcw size={18} /> Restaurar demo
          </button>
        </div>
      </aside>
      <div className="admin-content">
        <div className="admin-heading">
          <div>
            <span className="eyebrow green">PAINEL DE CONTROLE</span>
            <h1>{section === "dashboard" ? "Dashboard" : "Produtos"}</h1>
            <p>Gerencie sua loja em um só lugar.</p>
          </div>
          <button
            className="btn primary"
            onClick={() => {
              setEditing({ ...empty });
              setSection("products");
            }}
          >
            <Plus size={18} /> NOVO PRODUTO
          </button>
        </div>
        {section === "dashboard" && (
          <>
            <div className="stat-grid">
              <div className="stat">
                <Package />
                <span>Produtos cadastrados</span>
                <strong>{products.length}</strong>
              </div>
              <div className="stat">
                <CheckCircle2 />
                <span>Em estoque</span>
                <strong>{stock}</strong>
              </div>
              <div className="stat">
                <AlertCircle className="danger" />
                <span>Esgotados</span>
                <strong>{sold}</strong>
              </div>
              <div className="stat">
                <LayoutDashboard />
                <span>Valor do estoque</span>
                <strong className="stat-money">{money(inventoryValue)}</strong>
              </div>
            </div>
            <div className="admin-notice">
              <strong>Ambiente demonstrativo</strong>
              <p>
                Os dados ficam salvos apenas neste navegador. Não há vendas
                reais, autenticação nem sincronização com banco de dados.
              </p>
            </div>
          </>
        )}
        <div className="admin-table-card">
          <div className="table-heading">
            <div>
              <h2>Gerenciar produtos</h2>
              <p>Edite preços, informações e quantidades em estoque.</p>
            </div>
            <div className="table-search">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produto..."
              />
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>PRODUTO</th>
                  <th>CATEGORIA</th>
                  <th>PREÇO</th>
                  <th>ESTOQUE</th>
                  <th>STATUS</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((p) =>
                    p.name.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="table-product">
                          <img src={p.image} alt="" />
                          <strong>{p.name}</strong>
                        </div>
                      </td>
                      <td>{p.category}</td>
                      <td>{money(p.price)}</td>
                      <td>{p.stock}</td>
                      <td>
                        <span
                          className={
                            p.stock ? "status available" : "status unavailable"
                          }
                        >
                          {p.stock ? "Em estoque" : "Esgotado"}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            aria-label={"Editar " + p.name}
                            onClick={() => setEditing({ ...p })}
                          >
                            <PenLine size={17} />
                          </button>
                          <button
                            aria-label={"Excluir " + p.name}
                            onClick={() => setConfirmId(p.id)}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editing && (
        <div className="modal-backdrop" onClick={() => setEditing(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <span className="eyebrow green">CATÁLOGO</span>
                <h2>{editing.id ? "Editar produto" : "Novo produto"}</h2>
              </div>
              <button
                className="icon-button"
                onClick={() => setEditing(null)}
                aria-label="Fechar"
              >
                <X />
              </button>
            </div>
            <form onSubmit={submit} className="edit-form">
              <label>
                Nome do produto
                <input
                  required
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                />
              </label>
              <label>
                Categoria
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                >
                  {categories
                    .filter((x) => x !== "Todos")
                    .map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                </select>
              </label>
              <div className="form-row">
                <label>
                  Preço (R$)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={editing.price}
                    onChange={(e) =>
                      setEditing({ ...editing, price: Number(e.target.value) })
                    }
                  />
                </label>
                <label>
                  Estoque
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={editing.stock}
                    onChange={(e) =>
                      setEditing({ ...editing, stock: Number(e.target.value) })
                    }
                  />
                </label>
              </div>
              <label>
                Imagem (URL ou caminho local)
                <input
                  value={editing.image}
                  onChange={(e) =>
                    setEditing({ ...editing, image: e.target.value })
                  }
                />
              </label>
              <label>
                Descrição
                <textarea
                  rows={3}
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                />
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={editing.featured}
                  onChange={(e) =>
                    setEditing({ ...editing, featured: e.target.checked })
                  }
                />{" "}
                Exibir na página inicial
              </label>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setEditing(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn primary">
                  Salvar produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {confirmId && (
        <div className="modal-backdrop">
          <div className="confirm-dialog">
            <h2>Excluir produto?</h2>
            <p>Essa ação remove o produto do catálogo desta demonstração.</p>
            <div className="form-actions">
              <button
                className="btn secondary"
                onClick={() => setConfirmId(null)}
              >
                Cancelar
              </button>
              <button
                className="btn danger-btn"
                onClick={() => {
                  deleteProduct(confirmId);
                  setConfirmId(null);
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
