import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertNewsSchema, insertProjectSchema, insertLeaderSchema, insertEventSchema, insertFeedbackSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // Simple ping endpoint for connectivity checks
  app.get("/api/ping", (req, res) => {
    res.status(200).send("pong");
  });
  
  // News API routes
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ message: "Error fetching news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const newsId = parseInt(req.params.id);
      const newsItem = await storage.getNewsById(newsId);
      
      if (!newsItem) {
        return res.status(404).json({ message: "News not found" });
      }
      
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ message: "Error fetching news" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const parseResult = insertNewsSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid news data", 
          errors: parseResult.error.errors 
        });
      }
      
      const newsData = parseResult.data;
      newsData.createdBy = req.user!.id;
      
      const newNews = await storage.createNews(newsData);
      res.status(201).json(newNews);
    } catch (error) {
      res.status(500).json({ message: "Error creating news" });
    }
  });

  app.put("/api/news/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const newsId = parseInt(req.params.id);
      const parseResult = insertNewsSchema.partial().safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid news data", 
          errors: parseResult.error.errors 
        });
      }
      
      const updatedNews = await storage.updateNews(newsId, parseResult.data);
      
      if (!updatedNews) {
        return res.status(404).json({ message: "News not found" });
      }
      
      res.json(updatedNews);
    } catch (error) {
      res.status(500).json({ message: "Error updating news" });
    }
  });

  app.delete("/api/news/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const newsId = parseInt(req.params.id);
      const success = await storage.deleteNews(newsId);
      
      if (!success) {
        return res.status(404).json({ message: "News not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting news" });
    }
  });

  // Projects API routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProjectById(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const parseResult = insertProjectSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid project data", 
          errors: parseResult.error.errors 
        });
      }
      
      const projectData = parseResult.data;
      projectData.createdBy = req.user!.id;
      
      const newProject = await storage.createProject(projectData);
      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({ message: "Error creating project" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const projectId = parseInt(req.params.id);
      const parseResult = insertProjectSchema.partial().safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid project data", 
          errors: parseResult.error.errors 
        });
      }
      
      const updatedProject = await storage.updateProject(projectId, parseResult.data);
      
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: "Error updating project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const projectId = parseInt(req.params.id);
      const success = await storage.deleteProject(projectId);
      
      if (!success) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting project" });
    }
  });

  // Leaders API routes
  app.get("/api/leaders", async (req, res) => {
    try {
      const leaders = await storage.getLeaders();
      res.json(leaders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching leaders" });
    }
  });

  app.get("/api/leaders/:id", async (req, res) => {
    try {
      const leaderId = parseInt(req.params.id);
      const leader = await storage.getLeaderById(leaderId);
      
      if (!leader) {
        return res.status(404).json({ message: "Leader not found" });
      }
      
      res.json(leader);
    } catch (error) {
      res.status(500).json({ message: "Error fetching leader" });
    }
  });

  app.post("/api/leaders", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const parseResult = insertLeaderSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid leader data", 
          errors: parseResult.error.errors 
        });
      }
      
      const newLeader = await storage.createLeader(parseResult.data);
      res.status(201).json(newLeader);
    } catch (error) {
      res.status(500).json({ message: "Error creating leader" });
    }
  });

  app.put("/api/leaders/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const leaderId = parseInt(req.params.id);
      const parseResult = insertLeaderSchema.partial().safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid leader data", 
          errors: parseResult.error.errors 
        });
      }
      
      const updatedLeader = await storage.updateLeader(leaderId, parseResult.data);
      
      if (!updatedLeader) {
        return res.status(404).json({ message: "Leader not found" });
      }
      
      res.json(updatedLeader);
    } catch (error) {
      res.status(500).json({ message: "Error updating leader" });
    }
  });

  app.delete("/api/leaders/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const leaderId = parseInt(req.params.id);
      const success = await storage.deleteLeader(leaderId);
      
      if (!success) {
        return res.status(404).json({ message: "Leader not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting leader" });
    }
  });

  // Events API routes
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const eventId = parseInt(req.params.id);
      const event = await storage.getEventById(eventId);
      
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Error fetching event" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const parseResult = insertEventSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid event data", 
          errors: parseResult.error.errors 
        });
      }
      
      const eventData = parseResult.data;
      eventData.createdBy = req.user!.id;
      
      const newEvent = await storage.createEvent(eventData);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ message: "Error creating event" });
    }
  });

  app.put("/api/events/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const eventId = parseInt(req.params.id);
      const parseResult = insertEventSchema.partial().safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid event data", 
          errors: parseResult.error.errors 
        });
      }
      
      const updatedEvent = await storage.updateEvent(eventId, parseResult.data);
      
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: "Error updating event" });
    }
  });

  app.delete("/api/events/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const eventId = parseInt(req.params.id);
      const success = await storage.deleteEvent(eventId);
      
      if (!success) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting event" });
    }
  });

  // User API routes (Admin only)
  app.get("/api/users", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user?.role !== 'admin') {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const users = await storage.getUsers();
      
      // Don't return password hashes
      const usersWithoutPasswords = users.map((user: any) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(usersWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated() || req.user?.role !== 'admin') {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return the password hash
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  });

  // Feedback API routes
  app.get("/api/feedback", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const feedbackItems = await storage.getFeedback();
      res.json(feedbackItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching feedback" });
    }
  });

  app.post("/api/feedback", async (req, res) => {
    try {
      const parseResult = insertFeedbackSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid feedback data", 
          errors: parseResult.error.errors 
        });
      }
      
      const newFeedback = await storage.createFeedback(parseResult.data);
      res.status(201).json(newFeedback);
    } catch (error) {
      res.status(500).json({ message: "Error submitting feedback" });
    }
  });

  app.put("/api/feedback/:id/resolve", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const feedbackId = parseInt(req.params.id);
      const resolvedFeedback = await storage.resolveFeedback(feedbackId);
      
      if (!resolvedFeedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      
      res.json(resolvedFeedback);
    } catch (error) {
      res.status(500).json({ message: "Error resolving feedback" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
