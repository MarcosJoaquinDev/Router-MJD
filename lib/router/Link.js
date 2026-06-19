import { jsx as _jsx } from "react/jsx-runtime";
import { navigate } from "./navigate";
export function Link({ to, target = "_self", children, ...props }) {
    const handleClick = (e)=>{
        const isMainEvent = e.button === 0;
        const isModifyEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
        const manageableEvent = target === "_self";
        if (isMainEvent && manageableEvent && !isModifyEvent) {
            e.preventDefault();
            navigate(to);
        }
    };
    return /*#__PURE__*/ _jsx("a", {
        onClick: handleClick,
        href: to,
        target: target,
        ...props,
        children: children
    });
}
