import { type User, type InsertUser, type Project, type InsertProject, type AboutInfo, type InsertAbout, type PaymentIntent, type InsertPaymentIntent } from "@shared/schema";
import { projectsData } from "@shared/projects-data";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Projects
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  
  // About info
  getAboutInfo(): Promise<AboutInfo | undefined>;
  createOrUpdateAboutInfo(info: InsertAbout): Promise<AboutInfo>;
  
  // Payment intents
  createPaymentIntent(intent: InsertPaymentIntent): Promise<PaymentIntent>;
  getPaymentIntent(id: string): Promise<PaymentIntent | undefined>;
  updatePaymentIntentStatus(id: string, status: string): Promise<PaymentIntent | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private aboutInfo: AboutInfo | undefined;
  private paymentIntents: Map<string, PaymentIntent>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.paymentIntents = new Map();
    this.initializeProjects();
  }

  private initializeProjects() {
    // Load projects from the projects-data.ts file
    // To add new projects, edit shared/projects-data.ts
    projectsData.forEach(project => {
      this.projects.set(project.id, project);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.featured);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = randomUUID();
    const newProject: Project = { 
      ...project, 
      id,
      featured: project.featured ?? null
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...project };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }


  async getAboutInfo(): Promise<AboutInfo | undefined> {
    return this.aboutInfo;
  }

  async createOrUpdateAboutInfo(info: InsertAbout): Promise<AboutInfo> {
    if (this.aboutInfo) {
      this.aboutInfo = { 
        ...this.aboutInfo, 
        ...info,
        profileImageUrl: info.profileImageUrl ?? this.aboutInfo.profileImageUrl
      };
    } else {
      const id = randomUUID();
      this.aboutInfo = { 
        ...info, 
        id,
        profileImageUrl: info.profileImageUrl ?? null
      };
    }
    return this.aboutInfo;
  }

  async createPaymentIntent(intent: InsertPaymentIntent): Promise<PaymentIntent> {
    const id = randomUUID();
    const newIntent: PaymentIntent = { 
      ...intent, 
      id, 
      createdAt: new Date().toISOString(),
      description: intent.description ?? null,
      includeBackend: intent.includeBackend ?? null
    };
    this.paymentIntents.set(id, newIntent);
    return newIntent;
  }

  async getPaymentIntent(id: string): Promise<PaymentIntent | undefined> {
    return this.paymentIntents.get(id);
  }

  async updatePaymentIntentStatus(id: string, status: string): Promise<PaymentIntent | undefined> {
    const existing = this.paymentIntents.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, status };
    this.paymentIntents.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
