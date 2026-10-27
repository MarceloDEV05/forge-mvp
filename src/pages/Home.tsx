import {
  ArrowRight,
  ShieldCheck,
  Truck,
  MessageCircle,
  Dumbbell,
  Zap,
  Package,
  HeartPulse,
} from "lucide-react";
import { Link } from "react-router-dom";
import {ProductCard} from "../components/ProductCard";
import { useStore } from "../store";
const cats = [
  { name: "Whey Protein", icon: Dumbbell },
  { name: "Creatina", icon: Package },
  { name: "Pré-treino", icon: Zap },
  { name: "Vitaminas", icon: HeartPulse },
];
export const Home = () => {
  const { products } = useStore();

  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow green">
              ● SUPLEMENTOS DE ALTA PERFORMANCE
            </span>
            <h1>
              DISCIPLINA
              <br />
              NUTRE
              <br />
              <em>RESULTADOS.</em>
            </h1>
            <p>
              Os melhores suplementos para quem leva o treino a sério. Sua
              evolução começa aqui.
            </p>
            <Link to="/catalogo" className="btn primary">
              EXPLORAR PRODUTOS <ArrowRight size={18} />
            </Link>
            <div className="hero-proof">
              <span>★★★★★</span> FEITO PARA QUEM NÃO PARA
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-glow" />
            <img src="/products/whey.svg" alt="Whey Protein FORGE" />
            <span className="hero-watermark">FORGE</span>
          </div>
          <div className="hero-perks">
            <div>
              <ShieldCheck />
              <span>
                QUALIDADE
                <br />
                EM PRIMEIRO LUGAR
              </span>
            </div>
            <div>
              <Truck />
              <span>
                ENTREGA
                <br />A COMBINAR
              </span>
            </div>
            <div>
              <MessageCircle />
              <span>
                ATENDIMENTO
                <br />
                VIA WHATSAPP
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="categories">
          {cats.map(({ name, icon: Icon }) => (
            <Link
              key={name}
              to={"/catalogo?categoria=" + encodeURIComponent(name)}
              className="category"
            >
              <Icon size={24} />
              <span>{name}</span>
              <ArrowRight size={15} />
            </Link>
          ))}
        </div>
        <section className="section">
          <div className="section-head">
            <div>
              <span className="eyebrow green">ESCOLHAS PARA SUA ROTINA</span>
              <h2>
                PRODUTOS <span>EM DESTAQUE</span>
              </h2>
              <p>Performance começa com as escolhas certas.</p>
            </div>
            <Link to="/catalogo" className="view-all">
              VER TODOS <ArrowRight size={17} />
            </Link>
          </div>
          <div className="product-grid">
            {products
              .filter((p) => p.featured)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </section>
        <div className="bottom-banner">
          <div>
            <span className="eyebrow green">SUA PRÓXIMA EVOLUÇÃO</span>
            <h2>
              SEM DESCULPAS.
              <br />
              <span>SÓ RESULTADOS.</span>
            </h2>
          </div>
          <Link className="btn primary" to="/catalogo">
            COMPRAR AGORA <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
