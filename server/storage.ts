import { users, type User, type InsertUser, customButtons, type CustomButton, type InsertCustomButton, type PageType } from "@shared/schema";
import { SQLiteStorage } from "./sqliteStorage";

// Interface para as operações de armazenamento
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Métodos para CustomButtons
  getCustomButtons(): Promise<CustomButton[]>;
  getCustomButtonsByPage(pageType: PageType): Promise<CustomButton[]>;
  getCustomButton(id: number): Promise<CustomButton | undefined>;
  createCustomButton(button: InsertCustomButton): Promise<CustomButton>;
  updateCustomButton(id: number, button: Partial<InsertCustomButton>): Promise<CustomButton | undefined>;
  deleteCustomButton(id: number): Promise<boolean>;
}

// Usar SQLiteStorage para persistência de dados em arquivo
// Isso será mais fácil de transportar para o ambiente Proxmox
export const storage = new SQLiteStorage();
