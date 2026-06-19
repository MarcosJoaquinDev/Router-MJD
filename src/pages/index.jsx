import { Link } from "../router/Link";
import "./index.css"
export default function Home() {
  return (
    <main className="home">
      <nav className="navbar">
        <div className="logo">📁 File Router</div>

        <div className="nav-links">
          <a href="#">Docs</a>
          <a href="#">GitHub</a>
        </div>
      </nav>

      <section className="hero">
        <h1>File Router para React</h1>

        <p>
          Un enrutador basado en sistema de archivos, inspirado en Next.js y
          diseñado para aplicaciones React modernas.
        </p>

        <div className="hero-buttons">
          <Link to="/about">
            <button>Comenzar</button>
          </Link>

          <button className="secondary">
            Ver documentación
          </button>
        </div>
      </section>

      <section className="features">
        <div className="card">
          <h3>⚡ Rápido</h3>
          <p>Navegación SPA sin recargar la página.</p>
        </div>

        <div className="card">
          <h3>📁 File Based</h3>
          <p>Las rutas se generan automáticamente desde archivos.</p>
        </div>

        <div className="card">
          <h3>🔧 Extensible</h3>
          <p>Middleware, layouts y rutas dinámicas.</p>
        </div>

        <div className="card">
          <h3>💡 Simple</h3>
          <p>API pequeña y fácil de aprender.</p>
        </div>
      </section>

      <section className="example">
        <h2>Ejemplo</h2>

        <pre>
{`src/
├─ pages/
│  ├─ index.jsx
│  ├─ about.jsx
│  └─ blog/
│     └─ index.jsx`}
        </pre>
      </section>
    </main>
  );
}