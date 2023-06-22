const PUSHSTATE = "pushstate";
export function navigate(href: string) {
  window.history.pushState({}, "", href);
  const navigationEvent = new Event(PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}