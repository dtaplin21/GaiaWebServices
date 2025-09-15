import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAboutSchema, insertProjectSchema } from "@shared/schema";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import Stripe from "stripe";

// Initialize Stripe only if API key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Portfolio routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      res.status(500).json({ error: "Failed to fetch featured projects" });
    }
  });


  // About info routes
  app.get("/api/about", async (req, res) => {
    try {
      const aboutInfo = await storage.getAboutInfo();
      if (!aboutInfo) {
        return res.json({
          id: "",
          bio: "Hi, I'm a passionate web designer and developer with over 5 years of experience creating beautiful, functional websites that help businesses grow. I specialize in modern web technologies including React, Next.js, and Tailwind CSS.\n\nMy approach combines strategic thinking with creative design to deliver websites that not only look amazing but also convert visitors into customers. I work closely with each client to understand their unique needs and goals.\n\nWhen I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or enjoying a good cup of coffee while brainstorming the next big idea.",
          profileImageUrl: "/src/assets/Dom.jpeg"
        });
      }
      res.json(aboutInfo);
    } catch (error) {
      console.error("Error fetching about info:", error);
      res.status(500).json({ error: "Failed to fetch about info" });
    }
  });

  app.put("/api/about", async (req, res) => {
    try {
      const validatedData = insertAboutSchema.parse(req.body);
      const aboutInfo = await storage.createOrUpdateAboutInfo(validatedData);
      res.json(aboutInfo);
    } catch (error) {
      console.error("Error updating about info:", error);
      res.status(400).json({ error: "Invalid data" });
    }
  });

  // Object storage routes for profile image uploads
  app.get("/objects/:objectPath(*)", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error accessing object:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  app.post("/api/objects/upload", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  app.put("/api/profile-image", async (req, res) => {
    if (!req.body.profileImageURL) {
      return res.status(400).json({ error: "profileImageURL is required" });
    }

    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = objectStorageService.normalizeObjectEntityPath(req.body.profileImageURL);

      // Update about info with new image URL
      const currentAbout = await storage.getAboutInfo();
      if (currentAbout) {
        await storage.createOrUpdateAboutInfo({
          bio: currentAbout.bio,
          profileImageUrl: objectPath
        });
      }

      res.json({ objectPath });
    } catch (error) {
      console.error("Error setting profile image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Stripe payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ error: "Payment service not configured" });
    }
    
    try {
      const { amount, customerName, customerEmail, pageCount, includeBackend, description } = req.body;
      
      if (!amount || !customerName || !customerEmail || !pageCount) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          customerName,
          customerEmail,
          pageCount: pageCount.toString(),
          includeBackend: includeBackend ? "true" : "false",
          description: description || ""
        }
      });

      // Save payment intent to storage
      await storage.createPaymentIntent({
        stripePaymentIntentId: paymentIntent.id,
        customerName,
        customerEmail,
        pageCount,
        includeBackend: includeBackend || false,
        amount: Math.round(amount * 100),
        description: description || "",
        status: paymentIntent.status
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Error creating payment intent: " + error.message });
    }
  });

  // Webhook to handle payment status updates
  app.post("/api/stripe-webhook", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ error: "Payment service not configured" });
    }
    
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Update payment status in storage
      // TODO: Add proper method to update payment intent status
      // Update the corresponding payment intent status
      console.log("Payment succeeded:", paymentIntent.id);
    }

    res.json({ received: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
