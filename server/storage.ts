import { users, type User, type InsertUser, customButtons, type CustomButton, type InsertCustomButton, type PageType } from "@shared/schema";
import { DatabaseStorage } from "./databaseStorage";

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

// Usar DatabaseStorage para persistência de dados
export const storage = new DatabaseStorage();
