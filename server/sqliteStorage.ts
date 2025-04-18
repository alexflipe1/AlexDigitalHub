import { users, type User, type InsertUser, customButtons, type CustomButton, type InsertCustomButton, type PageType } from "@shared/schema";
import { db } from "./sqliteDb";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

export class SQLiteStorage implements IStorage {
  // Implementações para Usuários
  async getUser(id: number): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.username, username));
    return results[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const results = await db
      .insert(users)
      .values({
        username: insertUser.username,
        password: insertUser.password
      })
      .returning();
    return results[0];
  }
  
  // Implementações para CustomButtons
  async getCustomButtons(): Promise<CustomButton[]> {
    return await db.select().from(customButtons);
  }

  async getCustomButtonsByPage(pageType: PageType): Promise<CustomButton[]> {
    return await db.select().from(customButtons).where(eq(customButtons.pageType, pageType));
  }

  async getCustomButton(id: number): Promise<CustomButton | undefined> {
    const results = await db.select().from(customButtons).where(eq(customButtons.id, id));
    return results[0];
  }

  async createCustomButton(button: InsertCustomButton): Promise<CustomButton> {
    const results = await db
      .insert(customButtons)
      .values({
        title: button.title,
        description: button.description,
        pageType: button.pageType as PageType,
        icon: button.icon,
        iconBgColor: button.iconBgColor,
        url: button.url,
        openType: button.openType || "iframe"
      })
      .returning();
    return results[0];
  }

  async updateCustomButton(id: number, buttonUpdate: Partial<InsertCustomButton>): Promise<CustomButton | undefined> {
    // Cria um objeto vazio para armazenar os campos atualizados
    const updateValues: Record<string, any> = {};
    
    // Adiciona apenas os campos que foram fornecidos
    if (buttonUpdate.title !== undefined) updateValues.title = buttonUpdate.title;
    if (buttonUpdate.description !== undefined) updateValues.description = buttonUpdate.description;
    if (buttonUpdate.pageType !== undefined) updateValues.pageType = buttonUpdate.pageType as PageType;
    if (buttonUpdate.icon !== undefined) updateValues.icon = buttonUpdate.icon;
    if (buttonUpdate.iconBgColor !== undefined) updateValues.iconBgColor = buttonUpdate.iconBgColor;
    if (buttonUpdate.url !== undefined) updateValues.url = buttonUpdate.url;
    if (buttonUpdate.openType !== undefined) updateValues.openType = buttonUpdate.openType;
    
    const results = await db
      .update(customButtons)
      .set(updateValues)
      .where(eq(customButtons.id, id))
      .returning();
    return results[0];
  }

  async deleteCustomButton(id: number): Promise<boolean> {
    await db
      .delete(customButtons)
      .where(eq(customButtons.id, id));
    return true;
  }
}