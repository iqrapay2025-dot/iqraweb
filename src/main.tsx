
    import { createRoot } from "react-dom/client";
  import App from "./App";
  import "./index.css";
  import { initScrollAnimate } from "./lib/scrollAnimate";

  // Strip non-essential debug logging in production builds so internal state
  // is not leaked to end users and the browser console stays clean. Genuine
  // warnings and errors (console.warn / console.error) remain available for
  // monitoring.
  if (import.meta.env.PROD) {
    console.log = () => {};
    console.info = () => {};
    console.debug = () => {};
  }

  // Signal that JavaScript is available. The scroll-in animation is scoped to
  // the `js` class (see src/styles/globals.css); without JS every <section>
  // renders normally and is never hidden.
  document.documentElement.classList.add("js");

  // Site-wide scroll in/out animation for <section> elements on every page
  // (see src/lib/scrollAnimate.ts). Handles client-side navigation too, so
  // every section on every page animates without editing page components.
  initScrollAnimate();

  createRoot(document.getElementById("root")!).render(<App />);
  