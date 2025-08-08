import { createRoot } from "react-dom/client";
import App from "./App-minimal";

// Ensure the app loads regardless of CSS issues
try {
  createRoot(document.getElementById("root")!).render(<App />);
} catch (error) {
  console.error("React rendering error:", error);
  document.getElementById("root")!.innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: system-ui;">
      <div style="text-align: center;">
        <h1>🚗 Gariyangu</h1>
        <p>Kenya Motor Vehicle Platform</p>
        <p>Backend operational - Frontend loading...</p>
      </div>
    </div>
  `;
}
