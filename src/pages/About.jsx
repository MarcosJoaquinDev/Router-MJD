import { navigate } from "../router/index";
export default function About() {
  return (
    <>
      <h1>About</h1>
      <button onClick={()=>navigate('/product/123')}>Ir a product</button>
    </>
  );
}