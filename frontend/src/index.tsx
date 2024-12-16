import React from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Theme accentColor="orange" panelBackground="solid">
      <App />
    </Theme>
  </React.StrictMode>
);
