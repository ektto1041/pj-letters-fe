import { createRoot } from "react-dom/client";
import { RouteProvider } from "./app/router/index.tsx";

createRoot(document.getElementById("root")!).render(<RouteProvider />);
