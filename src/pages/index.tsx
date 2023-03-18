import { Link } from "../router/Link";
export default function Main() {
  return (
    <>
      <h1>Bienvenido a mi custom Router</h1>
      <Link to="/home">
        <h3>Home</h3>
      </Link>
    </>
  );
}
