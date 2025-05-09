import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // inoltro tutte le richieste api sulla porta attiva per il server generato con node.js
  server: {
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
});
