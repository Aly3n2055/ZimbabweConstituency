import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "kuwadzana-west-constituency-secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false, // Set to true in production with HTTPS
      sameSite: 'lax' // Helps with CSRF
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log(`Attempting login for user: ${username}`);
        
        // Get user from database
        const user = await storage.getUserByUsername(username);
        
        if (!user) {
          console.log(`User not found: ${username}`);
          return done(null, false, { message: "Username not found" });
        }
        
        // Check password
        const passwordMatch = await comparePasswords(password, user.password);
        if (!passwordMatch) {
          console.log(`Invalid password for user: ${username}`);
          return done(null, false, { message: "Invalid password" });
        }
        
        console.log(`User authenticated successfully: ${username}`);
        return done(null, user);
      } catch (error) {
        console.error(`Login error for ${username}:`, error);
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      console.log("Registration attempt:", req.body.username);
      
      // Validate input
      if (!req.body.username || !req.body.password || !req.body.role) {
        console.log("Registration failed: Missing required fields");
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        console.log("Registration failed: Username already exists", req.body.username);
        return res.status(400).json({ message: "Username already exists" });
      }

      console.log("Creating new user:", req.body.username);
      const hashedPassword = await hashPassword(req.body.password);
      
      const userData = {
        ...req.body,
        password: hashedPassword,
        email: req.body.email || null,
        fullName: req.body.fullName || null,
        phoneNumber: req.body.phoneNumber || null
      };
      
      try {
        const user = await storage.createUser(userData);
        console.log("User created successfully:", user.username, "with ID:", user.id);
        
        req.login(user, (err) => {
          if (err) {
            console.error("Login after registration failed:", err);
            return next(err);
          }
          // Don't return the password hash
          const { password, ...userWithoutPassword } = user;
          res.status(201).json(userWithoutPassword);
        });
      } catch (dbError) {
        console.error("Database error during user creation:", dbError);
        return res.status(500).json({ message: "Error creating user account" });
      }
    } catch (error) {
      console.error("Unexpected error during registration:", error);
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    // Validate request
    if (!req.body.username || !req.body.password) {
      console.log("Login failed: Missing credentials");
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    console.log("Login attempt for:", req.body.username);
    
    passport.authenticate("local", (err: any, user: Express.User | false, info: any) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error during login" });
      }
      
      if (!user) {
        console.log("Login failed for username:", req.body.username, "Info:", info?.message || "No message");
        return res.status(401).json({ message: info?.message || "Invalid username or password" });
      }
      
      req.login(user, (loginErr) => {
        if (loginErr) {
          console.error("Session login error:", loginErr);
          return res.status(500).json({ message: "Error during login process" });
        }
        
        console.log("User logged in successfully:", user.username);
        // Don't return the password hash
        const { password, ...userWithoutPassword } = user;
        return res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    // Don't return the password hash
    const { password, ...userWithoutPassword } = req.user!;
    res.json(userWithoutPassword);
  });
}
