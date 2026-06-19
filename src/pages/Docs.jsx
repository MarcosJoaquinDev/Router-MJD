import "./docs.css"

export default function Docs() {
  return (
    <div className="docs-layout">
      <aside className="sidebar">
        <h2>MJD Router</h2>

        <nav>
          <a href="#intro">Introducción</a>
          <a href="#install">Instalación</a>
          <a href="#router">Router</a>
          <a href="#link">Link</a>
          <a href="#navigate">Navigate</a>
          <a href="#dynamic">Rutas Dinámicas</a>
          <a href="#scripts">Scripts</a>
          <a href="#architecture">Arquitectura</a>
        </nav>
      </aside>

      <main className="docs-content">
        <section id="intro">
          <span className="badge">v1.0.5</span>

          <h1>MJD Router</h1>

          <p>
            Router para React basado en sistema de archivos,
            inspirado en Next.js pero diseñado para React puro.
          </p>
        </section>

        <section id="install">
          <h2>Instalación</h2>

          <pre>
{`npm install mjd-router`}
          </pre>
        </section>

        <section id="router">
          <h2>Uso básico</h2>

          <pre>
{`import { Router } from "mjd-router";

function App() {
  return <Router />;
}`}
          </pre>
        </section>

        <section id="dynamic">
          <h2>Rutas dinámicas</h2>

          <pre>
{`src/pages/
└── product/
    └── [productId].jsx`}
          </pre>

          <pre>
{`/product/123

routeParams = {
  productId: "123"
}`}
          </pre>
        </section>

        <section id="scripts">
          <h2>Scripts</h2>

          <table>
            <tbody>
              <tr>
                <td>npm run dev</td>
                <td>Watcher + Vite</td>
              </tr>

              <tr>
                <td>npm run write</td>
                <td>Genera pages.json</td>
              </tr>

              <tr>
                <td>npm run watch</td>
                <td>Observa src/pages</td>
              </tr>

              <tr>
                <td>npm run build</td>
                <td>Build producción</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}