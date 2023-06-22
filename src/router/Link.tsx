import { navigate } from "./navigate";

type LinkPros = {
  to: string;
  target?: "_blank" | "_self" | "_parent" | "top";
  children: any;
};
export function Link({ to, target = "_self", ...props }: LinkPros) {
  const handleClick = (e: any) => {
    const iMsainEvent = e.button == 0; //primary key
    const isModifyEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
    const manageableEvent = target == undefined || target == "_self";
    if (iMsainEvent && manageableEvent && !isModifyEvent) {
      e.preventDefault();
      navigate(to); //SPA navigation
    }
  };
  return (
    <>
      <a onClick={handleClick} href={to} target={target} {...props}></a>
    </>
  );
}
