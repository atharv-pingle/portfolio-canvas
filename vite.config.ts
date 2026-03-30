import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs/promises";
import { existsSync } from "fs";
import type { IncomingMessage } from "http";

const LEADS_FILE_PATH = path.resolve(__dirname, "data/resume-leads.json");

type ResumeLead = {
  name: string;
  email: string;
  createdAt: string;
};

const readJsonBody = async (req: IncomingMessage) =>
  new Promise<Record<string, unknown>>((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });

const createResumeLeadApiPlugin = () => ({
  name: "resume-lead-api",
  apply: "serve" as const,
  configureServer(server) {
    server.middlewares.use("/api/resume-leads", async (req, res) => {
      if (req.method !== "POST") {
        res.statusCode = 405;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Method not allowed" }));
        return;
      }

      try {
        const payload = await readJsonBody(req);
        const name = typeof payload.name === "string" ? payload.name.trim() : "";
        const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
        const createdAt =
          typeof payload.createdAt === "string" && payload.createdAt
            ? payload.createdAt
            : new Date().toISOString();

        if (!name || !email) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Name and email are required" }));
          return;
        }

        await fs.mkdir(path.dirname(LEADS_FILE_PATH), { recursive: true });

        let leads: ResumeLead[] = [];
        if (existsSync(LEADS_FILE_PATH)) {
          const fileContent = await fs.readFile(LEADS_FILE_PATH, "utf-8");
          const parsed = fileContent ? JSON.parse(fileContent) : [];
          leads = Array.isArray(parsed) ? (parsed as ResumeLead[]) : [];
        }

        const alreadyExists = leads.some((lead) => lead.email === email);
        if (!alreadyExists) {
          leads.push({ name, email, createdAt });
          await fs.writeFile(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), "utf-8");
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ ok: true, saved: !alreadyExists }));
      } catch {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Failed to store lead" }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), createResumeLeadApiPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
