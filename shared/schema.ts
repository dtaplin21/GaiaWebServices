import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  liveUrl: text("live_url").notNull(),
  technologies: text("technologies").array().notNull(),
  featured: boolean("featured").default(false),
});


export const aboutInfo = pgTable("about_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bio: text("bio").notNull(),
  profileImageUrl: text("profile_image_url"),
});

export const paymentIntents = pgTable("payment_intents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  stripePaymentIntentId: text("stripe_payment_intent_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  pageCount: integer("page_count").notNull(),
  includeBackend: boolean("include_backend").default(false),
  amount: integer("amount").notNull(), // in cents
  description: text("description"),
  status: text("status").notNull(),
  createdAt: text("created_at").default(sql`now()`),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment").notNull(),
  approved: boolean("approved").default(false),
  createdAt: text("created_at").default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});


export const insertAboutSchema = createInsertSchema(aboutInfo).omit({
  id: true,
});

export const insertPaymentIntentSchema = createInsertSchema(paymentIntents).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type AboutInfo = typeof aboutInfo.$inferSelect;
export type InsertAbout = z.infer<typeof insertAboutSchema>;
export type PaymentIntent = typeof paymentIntents.$inferSelect;
export type InsertPaymentIntent = z.infer<typeof insertPaymentIntentSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
