import { users, type User, type InsertUser, customButtons, type CustomButton, type InsertCustomButton, type PageType } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private customButtons: Map<number, CustomButton>;
  private userCurrentId: number;
  private buttonCurrentId: number;

  constructor() {
    this.users = new Map();
    this.customButtons = new Map();
    this.userCurrentId = 1;
    this.buttonCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Implementações para CustomButtons
  async getCustomButtons(): Promise<CustomButton[]> {
    return Array.from(this.customButtons.values());
  }

  async getCustomButtonsByPage(pageType: PageType): Promise<CustomButton[]> {
    return Array.from(this.customButtons.values()).filter(button => button.pageType === pageType);
  }

  async getCustomButton(id: number): Promise<CustomButton | undefined> {
    return this.customButtons.get(id);
  }

  async createCustomButton(button: InsertCustomButton): Promise<CustomButton> {
    const id = this.buttonCurrentId++;
    const now = new Date();
    const newButton = { 
      ...button, 
      id, 
      createdAt: now 
    } as CustomButton;
    this.customButtons.set(id, newButton);
    return newButton;
  }

  async updateCustomButton(id: number, buttonUpdate: Partial<InsertCustomButton>): Promise<CustomButton | undefined> {
    const existingButton = this.customButtons.get(id);
    if (!existingButton) {
      return undefined;
    }
    
    const updatedButton = {
      ...existingButton,
      ...buttonUpdate
    } as CustomButton;
    
    this.customButtons.set(id, updatedButton);
    return updatedButton;
  }

  async deleteCustomButton(id: number): Promise<boolean> {
    return this.customButtons.delete(id);
  }
}

export const storage = new MemStorage();
