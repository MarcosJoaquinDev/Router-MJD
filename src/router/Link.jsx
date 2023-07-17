import { navigate } from "./navigate";

export function Link({ to, target = "_self", ...props }) {
  const handleClick = (e) => {
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
