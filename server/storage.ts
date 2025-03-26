import { users, User, InsertUser, news, News, InsertNews, projects, Project, InsertProject, leaders, Leader, InsertLeader, events, Event, InsertEvent, feedback, Feedback, InsertFeedback } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // News operations
  getNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  createNews(newsItem: InsertNews): Promise<News>;
  updateNews(id: number, newsItem: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: number): Promise<boolean>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Leader operations
  getLeaders(): Promise<Leader[]>;
  getLeaderById(id: number): Promise<Leader | undefined>;
  createLeader(leader: InsertLeader): Promise<Leader>;
  updateLeader(id: number, leader: Partial<InsertLeader>): Promise<Leader | undefined>;
  deleteLeader(id: number): Promise<boolean>;
  
  // Event operations
  getEvents(): Promise<Event[]>;
  getEventById(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  
  // Feedback operations
  getFeedback(): Promise<Feedback[]>;
  getFeedbackById(id: number): Promise<Feedback | undefined>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  updateFeedback(id: number, feedback: Partial<Feedback>): Promise<Feedback | undefined>;
  resolveFeedback(id: number): Promise<Feedback | undefined>;
  
  // Session store for authentication
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private newsItems: Map<number, News>;
  private projectItems: Map<number, Project>;
  private leaderItems: Map<number, Leader>;
  private eventItems: Map<number, Event>;
  private feedbackItems: Map<number, Feedback>;
  
  sessionStore: session.SessionStore;
  
  // Counters for auto-increment IDs
  private userCounter: number;
  private newsCounter: number;
  private projectCounter: number;
  private leaderCounter: number;
  private eventCounter: number;
  private feedbackCounter: number;

  constructor() {
    this.users = new Map();
    this.newsItems = new Map();
    this.projectItems = new Map();
    this.leaderItems = new Map();
    this.eventItems = new Map();
    this.feedbackItems = new Map();
    
    this.userCounter = 1;
    this.newsCounter = 1;
    this.projectCounter = 1;
    this.leaderCounter = 1;
    this.eventCounter = 1;
    this.feedbackCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    // Initialize with some default data (admin user)
    this.createUser({
      username: "admin",
      password: "adminpass", // This will be hashed in auth.ts
      email: "admin@kuwadzanawest.gov.zw",
      fullName: "Administrator",
      role: "admin"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.newsItems.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getNewsById(id: number): Promise<News | undefined> {
    return this.newsItems.get(id);
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const id = this.newsCounter++;
    const createdAt = new Date();
    const news: News = { ...newsItem, id, createdAt };
    this.newsItems.set(id, news);
    return news;
  }

  async updateNews(id: number, newsItem: Partial<InsertNews>): Promise<News | undefined> {
    const existingNews = this.newsItems.get(id);
    if (!existingNews) {
      return undefined;
    }
    
    const updatedNews: News = { ...existingNews, ...newsItem };
    this.newsItems.set(id, updatedNews);
    return updatedNews;
  }

  async deleteNews(id: number): Promise<boolean> {
    return this.newsItems.delete(id);
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projectItems.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projectItems.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectCounter++;
    const newProject: Project = { ...project, id };
    this.projectItems.set(id, newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projectItems.get(id);
    if (!existingProject) {
      return undefined;
    }
    
    const updatedProject: Project = { ...existingProject, ...project };
    this.projectItems.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projectItems.delete(id);
  }

  // Leader methods
  async getLeaders(): Promise<Leader[]> {
    return Array.from(this.leaderItems.values());
  }

  async getLeaderById(id: number): Promise<Leader | undefined> {
    return this.leaderItems.get(id);
  }

  async createLeader(leader: InsertLeader): Promise<Leader> {
    const id = this.leaderCounter++;
    const newLeader: Leader = { ...leader, id };
    this.leaderItems.set(id, newLeader);
    return newLeader;
  }

  async updateLeader(id: number, leader: Partial<InsertLeader>): Promise<Leader | undefined> {
    const existingLeader = this.leaderItems.get(id);
    if (!existingLeader) {
      return undefined;
    }
    
    const updatedLeader: Leader = { ...existingLeader, ...leader };
    this.leaderItems.set(id, updatedLeader);
    return updatedLeader;
  }

  async deleteLeader(id: number): Promise<boolean> {
    return this.leaderItems.delete(id);
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.eventItems.values()).sort((a, b) => 
      new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    );
  }

  async getEventById(id: number): Promise<Event | undefined> {
    return this.eventItems.get(id);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.eventCounter++;
    const newEvent: Event = { ...event, id };
    this.eventItems.set(id, newEvent);
    return newEvent;
  }

  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const existingEvent = this.eventItems.get(id);
    if (!existingEvent) {
      return undefined;
    }
    
    const updatedEvent: Event = { ...existingEvent, ...event };
    this.eventItems.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.eventItems.delete(id);
  }

  // Feedback methods
  async getFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbackItems.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getFeedbackById(id: number): Promise<Feedback | undefined> {
    return this.feedbackItems.get(id);
  }

  async createFeedback(feedbackItem: InsertFeedback): Promise<Feedback> {
    const id = this.feedbackCounter++;
    const createdAt = new Date();
    const isResolved = false;
    const feedback: Feedback = { ...feedbackItem, id, createdAt, isResolved };
    this.feedbackItems.set(id, feedback);
    return feedback;
  }

  async updateFeedback(id: number, feedbackItem: Partial<Feedback>): Promise<Feedback | undefined> {
    const existingFeedback = this.feedbackItems.get(id);
    if (!existingFeedback) {
      return undefined;
    }
    
    const updatedFeedback: Feedback = { ...existingFeedback, ...feedbackItem };
    this.feedbackItems.set(id, updatedFeedback);
    return updatedFeedback;
  }

  async resolveFeedback(id: number): Promise<Feedback | undefined> {
    const existingFeedback = this.feedbackItems.get(id);
    if (!existingFeedback) {
      return undefined;
    }
    
    const updatedFeedback: Feedback = { ...existingFeedback, isResolved: true };
    this.feedbackItems.set(id, updatedFeedback);
    return updatedFeedback;
  }
}

export const storage = new MemStorage();
