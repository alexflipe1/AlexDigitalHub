import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCustomButtonSchema, PageType } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rotas para os botões personalizados
  app.get("/api/buttons", async (_req: Request, res: Response) => {
    try {
      const buttons = await storage.getCustomButtons();
      res.json(buttons);
    } catch (error) {
      console.error("Erro ao buscar botões:", error);
      res.status(500).json({ error: "Erro ao buscar botões" });
    }
  });

  app.get("/api/buttons/page/:pageType", async (req: Request, res: Response) => {
    try {
      const pageType = req.params.pageType as PageType;
      const buttons = await storage.getCustomButtonsByPage(pageType);
      res.json(buttons);
    } catch (error) {
      console.error("Erro ao buscar botões para a página:", error);
      res.status(500).json({ error: "Erro ao buscar botões para a página" });
    }
  });

  app.get("/api/buttons/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const button = await storage.getCustomButton(id);
      if (!button) {
        return res.status(404).json({ error: "Botão não encontrado" });
      }

      res.json(button);
    } catch (error) {
      console.error("Erro ao buscar botão:", error);
      res.status(500).json({ error: "Erro ao buscar botão" });
    }
  });

  app.post("/api/buttons", async (req: Request, res: Response) => {
    try {
      const result = insertCustomButtonSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
      }

      const button = await storage.createCustomButton(result.data);
      res.status(201).json(button);
    } catch (error) {
      console.error("Erro ao criar botão:", error);
      res.status(500).json({ error: "Erro ao criar botão" });
    }
  });

  app.put("/api/buttons/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      // Validação parcial dos campos
      const buttonSchema = insertCustomButtonSchema.partial();
      const result = buttonSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.format() });
      }

      const updatedButton = await storage.updateCustomButton(id, result.data);
      if (!updatedButton) {
        return res.status(404).json({ error: "Botão não encontrado" });
      }

      res.json(updatedButton);
    } catch (error) {
      console.error("Erro ao atualizar botão:", error);
      res.status(500).json({ error: "Erro ao atualizar botão" });
    }
  });

  app.delete("/api/buttons/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const result = await storage.deleteCustomButton(id);
      if (!result) {
        return res.status(404).json({ error: "Botão não encontrado" });
      }

      res.status(204).end();
    } catch (error) {
      console.error("Erro ao excluir botão:", error);
      res.status(500).json({ error: "Erro ao excluir botão" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
