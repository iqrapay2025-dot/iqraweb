
  import { createRoot } from "react-dom/client";
  import App from "./App";
  import "./index.css";

  // Strip non-essential debug logging in production builds so internal state
  // is not leaked to end users and the browser console stays clean. Genuine
  // warnings and errors (console.warn / console.error) remain available for
  // monitoring.
  if (import.meta.env.PROD) {
    console.log = () => {};
    console.info = () => {};
    console.debug = () => {};
  }

  createRoot(document.getElementById("root")!).render(<App />);
  