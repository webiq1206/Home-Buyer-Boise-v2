import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, decimal, boolean, index, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums for property offers
export const propertyTypeEnum = z.enum(["single-family", "townhome", "condo", "duplex", "multi-unit", "land"]);
export const propertyConditionEnum = z.enum(["excellent", "good", "fair", "needs_work", "major_repairs"]);
export const reasonForSellingEnum = z.enum(["relocating", "inherited", "divorce", "tired_landlord", "foreclosure", "downsizing", "other"]);
export const timelineEnum = z.enum(["asap", "0-30days", "30-60days", "60+days", "exploring"]);
export const avmSourceEnum = z.enum(["zillow", "estated", "attom", "user_input", "none"]);
export const avmConfidenceEnum = z.enum(["high", "medium", "low", "none"]);

// Property offers for cash home buying
export const propertyOffers = pgTable("property_offers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // Contact info
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  
  // Property details
  address: text("address"),
  street: text("street"),
  city: text("city").notNull(),
  state: text("state").notNull().default("Idaho"),
  zip: text("zip"),
  fullAddress: text("full_address"),
  
  // Property characteristics
  propertyType: text("property_type").notNull(),
  beds: integer("beds"),
  baths: integer("baths"),
  squareFeet: integer("square_feet"),
  condition: text("condition").notNull(),
  
  // Seller situation
  reasonForSelling: text("reason_for_selling"),
  timeline: text("timeline"),
  desiredClosingDate: timestamp("desired_closing_date"),
  
  // Valuation & Offer
  estimatedMarketValue: decimal("estimated_market_value", { precision: 12, scale: 2 }),
  avmSource: text("avm_source"),
  avmConfidence: text("avm_confidence"),
  avmFetchedAt: timestamp("avm_fetched_at"),
  avmRaw: jsonb("avm_raw"),
  avmFailureReason: text("avm_failure_reason"),
  
  estimatedRepairs: decimal("estimated_repairs", { precision: 10, scale: 2 }),
  offerLow: decimal("offer_low", { precision: 12, scale: 2 }),
  offerHigh: decimal("offer_high", { precision: 12, scale: 2 }),
  anchorOffer: decimal("anchor_offer", { precision: 12, scale: 2 }),
  calculationInputs: jsonb("calculation_inputs"),
  
  // Consent & Communication
  consentToContact: boolean("consent_to_contact").notNull(),
  consentToText: boolean("consent_to_text"),
  consentToEmail: boolean("consent_to_email"),
  
  // Status
  status: text("status").notNull().default("pending"),
  contactedAt: timestamp("contacted_at"),
  offerMadeAt: timestamp("offer_made_at"),
  acceptedAt: timestamp("accepted_at"),
  scheduledClosingDate: timestamp("scheduled_closing_date"),
  
  // Additional
  message: text("message"),
  notes: text("notes"),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  statusIdx: index("property_offers_status_idx").on(table.status),
  cityIdx: index("property_offers_city_idx").on(table.city),
  createdAtIdx: index("property_offers_created_at_idx").on(table.createdAt),
}));

export const insertPropertyOfferSchema = createInsertSchema(propertyOffers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  contactedAt: true,
  offerMadeAt: true,
  acceptedAt: true,
  avmFetchedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  name: z.string().min(2, "Please enter your full name"),
  city: z.string().min(1, "Please select your city"),
  propertyType: propertyTypeEnum,
  condition: propertyConditionEnum,
  reasonForSelling: reasonForSellingEnum.optional(),
  timeline: timelineEnum.optional(),
  avmSource: avmSourceEnum.optional(),
  avmConfidence: avmConfidenceEnum.optional(),
  state: z.string().default("Idaho"),
  consentToContact: z.boolean(),
});

export const offerSubmissionSchema = insertPropertyOfferSchema.extend({
  estimatedMarketValue: z.union([z.string(), z.number()]).optional(),
  estimatedRepairs: z.union([z.string(), z.number()]).optional(),
  offerLow: z.union([z.string(), z.number()]).optional(),
  offerHigh: z.union([z.string(), z.number()]).optional(),
  anchorOffer: z.union([z.string(), z.number()]).optional(),
  calculationInputs: z.any().optional(),
  status: z.string().optional(),
  address: z.string().optional(),
  street: z.string().optional(),
  zip: z.string().optional(),
  fullAddress: z.string().optional(),
  beds: z.union([z.string(), z.number()]).optional(),
  baths: z.union([z.string(), z.number()]).optional(),
  squareFeet: z.union([z.string(), z.number()]).optional(),
  message: z.string().optional(),
  notes: z.string().optional(),
  desiredClosingDate: z.union([z.string(), z.date()]).optional(),
  scheduledClosingDate: z.union([z.string(), z.date()]).optional(),
  avmRaw: z.any().optional(),
  avmFailureReason: z.string().optional(),
  consentToText: z.boolean().optional(),
  consentToEmail: z.boolean().optional(),
});

export type InsertPropertyOffer = z.infer<typeof insertPropertyOfferSchema>;
export type OfferSubmission = z.infer<typeof offerSubmissionSchema>;
export type PropertyOffer = typeof propertyOffers.$inferSelect;

// Gallery Photos Schema
export const galleryPhotos = pgTable("gallery_photos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  city: text("city").notNull(),
  beforeImageUrl: text("before_image_url"),
  afterImageUrl: text("after_image_url"),
  imageUrl: text("image_url"),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGalleryPhotoSchema = createInsertSchema(galleryPhotos).omit({
  id: true,
  createdAt: true,
});

export type GalleryPhoto = typeof galleryPhotos.$inferSelect;
export type InsertGalleryPhoto = z.infer<typeof insertGalleryPhotoSchema>;

// Testimonials Schema
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  situation: text("situation").notNull(),
  city: text("city").notNull(),
  rating: text("rating").notNull(),
  testimonial: text("testimonial").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

// Blog Posts Schema
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().notNull(),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

// Session storage table
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => ({
    expireIdx: index("IDX_session_expire").on(table.expire),
  })
);

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  phone: text("phone"),
  role: text("role").notNull().default("viewer"),
  company: text("company"),
  agreementAccepted: boolean("agreement_accepted").default(false),
  agreementAcceptedAt: timestamp("agreement_accepted_at"),
  stripeCustomerId: text("stripe_customer_id"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const upsertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

// Leads Schema
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  propertyOfferId: varchar("property_offer_id").references(() => propertyOffers.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city").notNull(),
  propertyType: text("property_type").notNull(),
  condition: text("condition"),
  anchorOffer: decimal("anchor_offer", { precision: 12, scale: 2 }),
  estimatedMarketValue: decimal("estimated_market_value", { precision: 12, scale: 2 }),
  estimatedRepairs: decimal("estimated_repairs", { precision: 10, scale: 2 }),
  offerLow: decimal("offer_low", { precision: 12, scale: 2 }),
  offerHigh: decimal("offer_high", { precision: 12, scale: 2 }),
  message: text("message"),
  baseLeadPrice: decimal("base_lead_price", { precision: 10, scale: 2 }).notNull(),
  currentLeadPrice: decimal("current_lead_price", { precision: 10, scale: 2 }).notNull(),
  priceReductionRate: decimal("price_reduction_rate", { precision: 5, scale: 2 }).notNull().default("5.00"),
  lastPriceUpdate: timestamp("last_price_update").defaultNow(),
  status: text("status").notNull().default("pending_admin"),
  adminReviewedBy: varchar("admin_reviewed_by").references(() => users.id),
  adminReviewedAt: timestamp("admin_reviewed_at"),
  adminDeclined: boolean("admin_declined").default(false),
  assignedTo: varchar("assigned_to").references(() => users.id),
  assignedAt: timestamp("assigned_at"),
  purchasedBy: varchar("purchased_by").references(() => users.id),
  purchasedAt: timestamp("purchased_at"),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  lastContactedAt: timestamp("last_contacted_at"),
  nextFollowUpDate: timestamp("next_follow_up_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  statusIdx: index("leads_status_idx").on(table.status),
  cityIdx: index("leads_city_idx").on(table.city),
  assignedToIdx: index("leads_assigned_to_idx").on(table.assignedTo),
  statusCityIdx: index("leads_status_city_idx").on(table.status, table.city),
  priceIdx: index("leads_current_price_idx").on(table.currentLeadPrice),
}));

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastPriceUpdate: true,
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

// Lead Purchases Schema
export const leadPurchases = pgTable("lead_purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").notNull().unique().references(() => leads.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }).notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id").notNull(),
  stripeChargeId: text("stripe_charge_id"),
  refunded: boolean("refunded").default(false),
  refundReason: text("refund_reason"),
  refundedAt: timestamp("refunded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("lead_purchases_user_id_idx").on(table.userId),
}));

export const insertLeadPurchaseSchema = createInsertSchema(leadPurchases).omit({
  id: true,
  createdAt: true,
});

export type LeadPurchase = typeof leadPurchases.$inferSelect;
export type InsertLeadPurchase = z.infer<typeof insertLeadPurchaseSchema>;

// Notifications Schema
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: text("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  leadId: varchar("lead_id").references(() => leads.id),
  propertyOfferId: varchar("property_offer_id").references(() => propertyOffers.id),
  read: boolean("read").default(false),
  emailSent: boolean("email_sent").default(false),
  emailSentAt: timestamp("email_sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("notifications_user_id_idx").on(table.userId),
  userIdReadIdx: index("notifications_user_id_read_idx").on(table.userId, table.read),
}));

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
