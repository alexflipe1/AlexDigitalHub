import { users, type User, type InsertUser, customButtons, type CustomButton, type InsertCustomButton, type PageType, openTypes } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // Implementações para Usuários
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Implementações para CustomButtons
  async getCustomButtons(): Promise<CustomButton[]> {
    return await db.select().from(customButtons);
  }

  async getCustomButtonsByPage(pageType: PageType): Promise<CustomButton[]> {
    return await db.select().from(customButtons).where(eq(customButtons.pageType, pageType));
  }

  async getCustomButton(id: number): Promise<CustomButton | undefined> {
    const [button] = await db.select().from(customButtons).where(eq(customButtons.id, id));
    return button;
  }

  async createCustomButton(button: InsertCustomButton): Promise<CustomButton> {
    // Certifique-se de que todos os valores são do tipo correto antes de inserir
    const buttonToInsert = {
      title: button.title,
      description: button.description,
      pageType: button.pageType,
      icon: button.icon,
      iconBgColor: button.iconBgColor,
      url: button.url,
      openType: button.openType || 'iframe'
    };
    
    const [newButton] = await db
      .insert(customButtons)
      .values(buttonToInsert)
      .returning();
    return newButton;
  }

  async updateCustomButton(id: number, buttonUpdate: Partial<InsertCustomButton>): Promise<CustomButton | undefined> {
    // Cria um objeto com apenas as propriedades válidas
    const updateData: Record<string, any> = {};
    
    if (buttonUpdate.title !== undefined) updateData.title = buttonUpdate.title;
    if (buttonUpdate.description !== undefined) updateData.description = buttonUpdate.description;
    if (buttonUpdate.pageType !== undefined) updateData.pageType = buttonUpdate.pageType;
    if (buttonUpdate.icon !== undefined) updateData.icon = buttonUpdate.icon;
    if (buttonUpdate.iconBgColor !== undefined) updateData.iconBgColor = buttonUpdate.iconBgColor;
    if (buttonUpdate.url !== undefined) updateData.url = buttonUpdate.url;
    if (buttonUpdate.openType !== undefined) updateData.openType = buttonUpdate.openType;
    
    const [updatedButton] = await db
      .update(customButtons)
      .set(updateData)
      .where(eq(customButtons.id, id))
      .returning();
    return updatedButton;
  }

  async deleteCustomButton(id: number): Promise<boolean> {
    await db
      .delete(customButtons)
      .where(eq(customButtons.id, id));
    // Retorna true assumindo que a operação foi bem-sucedida
    // Se ocorrer algum erro, a exceção será lançada antes de chegar aqui
    return true;
  }
}