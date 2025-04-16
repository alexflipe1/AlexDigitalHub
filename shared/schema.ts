import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Esquema para os botões personalizados
export const pageTypes = ["home", "alex", "servico", "sites", "entretenimento"] as const;
export type PageType = typeof pageTypes[number];

// Tipos de abertura de link
export const openTypes = ["iframe", "new_tab"] as const;
export type OpenType = typeof openTypes[number];

export const customButtons = pgTable("custom_buttons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  pageType: text("page_type").notNull().$type<PageType>(),
  icon: text("icon").notNull(),
  iconBgColor: text("icon_bg_color").notNull(),
  url: text("url").notNull(),
  openType: text("open_type").notNull().default("iframe").$type<OpenType>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCustomButtonSchema = createInsertSchema(customButtons).pick({
  title: true,
  description: true,
  pageType: true,
  icon: true,
  iconBgColor: true,
  url: true,
  openType: true,
});

export type InsertCustomButton = z.infer<typeof insertCustomButtonSchema>;
export type CustomButton = typeof customButtons.$inferSelect;
