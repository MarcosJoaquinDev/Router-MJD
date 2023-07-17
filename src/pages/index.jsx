import { Link } from "../router/Link";
export default function Home() {
  return (
    <>
      <h1>Bienvenido a mi custom Router</h1>
      <Link to="/about">
        <h3>Home</h3>
      </Link>
    </>
  );
}
