import { navigate } from "./navigate";

export function Link({ to, target = "_self", children, ...props }) {
  const handleClick = (e) => {
    const isMainEvent = e.button === 0;
    const isModifyEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
    const manageableEvent = target === "_self";
    if (isMainEvent && manageableEvent && !isModifyEvent) {
      e.preventDefault();
      navigate(to);
    }
  };
  return <a onClick={handleClick} href={to} target={target} {...props}>{children}</a>;
}
