export default function ProductId({ routeParams }: any) {
  return (
    <>
      <h3>Products:</h3>
      <h4>{JSON.stringify(routeParams)}</h4>
    </>
  );
}
