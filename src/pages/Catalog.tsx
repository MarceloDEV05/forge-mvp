import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "../data";
import { useStore } from "../store";
import { ProductCard } from "../components/ProductCard";


export const Catalog = () => {
  
  const { products } = useStore();
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const [available, setAvailable] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const category = params.get("categoria") || "Todos";
  const q = params.get("q") || "";
  const shown = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (category === "Todos" || p.category === category) &&
            (!available || p.stock > 0) &&
            p.name.toLowerCase().includes(q.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "low"
            ? a.price - b.price
            : sort === "high"
              ? b.price - a.price
              : Number(b.featured) - Number(a.featured),
        ),
    [products, category, q, available, sort],
  );

  return (
    <main className="container catalog">
      <div className="page-heading">
        <span className="eyebrow green">FORGE / SUPLEMENTOS</span>
        <h1>
          ENCONTRE SUA <em>FORÇA.</em>
        </h1>
        <p>Os produtos certos para cada etapa da sua jornada.</p>
      </div>
      <div className="catalog-layout">
        <aside className={"filters " + (filtersOpen ? "show" : "")}>
          <h3>CATEGORIAS</h3>
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "filter active" : "filter"}
              onClick={() => {
                setParams((prev) => {
                  const next = new URLSearchParams(prev);
                  if (c === "Todos") next.delete("categoria");
                  else next.set("categoria", c);
                  return next;
                });
                setFiltersOpen(false);
              }}
            >
              {c}
              <span>›</span>
            </button>
          ))}
          <h3 className="filter-heading">DISPONIBILIDADE</h3>
          <label className="check">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />{" "}
            Apenas em estoque
          </label>
          <div className="filter-note">
            Produtos sem estoque aparecem como esgotados e não podem ser
            adicionados ao carrinho.
          </div>
        </aside>
        <div className="catalog-main">
          <div className="catalog-toolbar">
            <div className="catalog-search">
              <Search size={18} />
              <input
                placeholder="Buscar produto..."
                aria-label="Buscar no catálogo"
                value={q}
                onChange={(e) =>
                  setParams((prev) => {
                    const next = new URLSearchParams(prev);
                    if (e.target.value) next.set("q", e.target.value);
                    else next.delete("q");
                    return next;
                  })
                }
              />
            </div>
            <button
              className="btn secondary filter-toggle"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <SlidersHorizontal size={17} /> Filtros
            </button>
            <select
              aria-label="Ordenar produtos"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Mais relevantes</option>
              <option value="low">Menor preço</option>
              <option value="high">Maior preço</option>
            </select>
          </div>
          <div className="results">{shown.length} produtos encontrados</div>
          {shown.length ? (
            <div className="product-grid catalog-grid">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>Nenhum produto encontrado</h3>
              <p>Tente outra busca ou categoria.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
