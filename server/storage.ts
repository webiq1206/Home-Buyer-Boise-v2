import { type Quote, type InsertQuote, type PropertyOffer, type InsertPropertyOffer, type GalleryPhoto, type InsertGalleryPhoto, type Testimonial, type InsertTestimonial, type BlogPost, type InsertBlogPost, type User, type UpsertUser, type Lead, type InsertLead, type LeadPurchase, type InsertLeadPurchase, type Notification, type InsertNotification } from "@shared/schema";
import { randomUUID } from "crypto";
import { BLOG_POSTS } from "@shared/blogContent";

export interface IStorage {
  createQuote(quote: InsertQuote): Promise<Quote>;
  getAllQuotes(): Promise<Quote[]>;
  getQuoteById(id: string): Promise<Quote | undefined>;
  
  // Property Offer methods (cash home buying)
  createPropertyOffer(offer: InsertPropertyOffer): Promise<PropertyOffer>;
  getAllPropertyOffers(): Promise<PropertyOffer[]>;
  getPropertyOfferById(id: string): Promise<PropertyOffer | undefined>;
  updatePropertyOffer(id: string, data: Partial<PropertyOffer>): Promise<PropertyOffer | undefined>;
  
  createGalleryPhoto(photo: InsertGalleryPhoto): Promise<GalleryPhoto>;
  getAllGalleryPhotos(): Promise<GalleryPhoto[]>;
  getGalleryPhotosByService(serviceType: string): Promise<GalleryPhoto[]>;
  
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByService(serviceType: string): Promise<Testimonial[]>;
  
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  
  // User/Auth methods (Replit Auth compatible)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUser(id: string, data: Partial<User>): Promise<User | undefined>;
  getAllSubcontractors(): Promise<User[]>;
  getAllAdmins(): Promise<User[]>;
  
  // Lead methods
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  getLeadById(id: string): Promise<Lead | undefined>;
  getLeadsByStatus(status: string): Promise<Lead[]>;
  getLeadsForSubcontractor(filters?: { city?: string; serviceType?: string; maxPrice?: number }): Promise<Lead[]>;
  updateLead(id: string, data: Partial<Lead>): Promise<Lead | undefined>;
  updateLeadPrices(): Promise<void>;
  acceptLead(leadId: string, adminUserId: string): Promise<Lead | undefined>;
  declineLead(leadId: string, adminUserId: string): Promise<Lead | undefined>;
  
  // Lead Purchase methods
  createLeadPurchase(purchase: InsertLeadPurchase): Promise<LeadPurchase>;
  getLeadPurchasesByUser(userId: string): Promise<LeadPurchase[]>;
  getLeadPurchaseByLead(leadId: string): Promise<LeadPurchase | undefined>;
  
  // Notification methods
  createNotification(notification: InsertNotification): Promise<Notification>;
  getNotificationsByUser(userId: string): Promise<Notification[]>;
  getNotificationsByUserId(userId: string): Promise<Notification[]>; // Alias for consistency
  markNotificationRead(id: string): Promise<void>;
  markNotificationAsRead(id: string): Promise<Notification | undefined>; // Returns the notification
  markNotificationEmailSent(id: string): Promise<void>;
  
  // Lead Purchase methods (aliases for API consistency)
  getLeadPurchaseByLeadId(leadId: string): Promise<LeadPurchase | undefined>;
}

export class MemStorage implements IStorage {
  private quotes: Map<string, Quote>;
  private propertyOffers: Map<string, PropertyOffer>;
  private galleryPhotos: Map<string, GalleryPhoto>;
  private testimonials: Map<string, Testimonial>;
  private blogPosts: Map<string, BlogPost>;
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private leadPurchases: Map<string, LeadPurchase>;
  private notifications: Map<string, Notification>;

  constructor() {
    this.quotes = new Map();
    this.propertyOffers = new Map();
    this.galleryPhotos = new Map();
    this.testimonials = new Map();
    this.blogPosts = new Map();
    this.users = new Map();
    this.leads = new Map();
    this.leadPurchases = new Map();
    this.notifications = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed gallery photos
    const sampleGalleryPhotos: GalleryPhoto[] = [
      {
        id: randomUUID(),
        category: "property_examples",
        city: "kuna",
        beforeImageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        afterImageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        title: "Kuna Family Home Purchase",
        description: "Purchased this 3-bedroom family home in Kuna as-is for cash, closed in 12 days",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        category: "property_examples",
        city: "boise",
        beforeImageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        afterImageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        title: "Boise North End Cottage",
        description: "Fast cash purchase of charming North End cottage needing updates, seller relocated for work",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        category: "property_examples",
        city: "meridian",
        beforeImageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
        afterImageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
        title: "Meridian Subdivision Home",
        description: "Purchased modern Meridian home for divorcing couple, quick closing on their timeline",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        category: "property_examples",
        city: "nampa",
        beforeImageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800",
        afterImageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
        title: "Nampa Fixer-Upper Purchase",
        description: "Cash purchase of inherited property needing repairs, no contingencies or appraisal needed",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        category: "property_examples",
        city: "eagle",
        beforeImageUrl: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800",
        afterImageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
        title: "Eagle Estate Property",
        description: "Purchased upscale Eagle property for downsizing empty-nesters, confidential and professional",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        category: "property_examples",
        city: "star",
        beforeImageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        afterImageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
        title: "Star Rural Property",
        description: "Cash purchase of horse property with tenant issues, handled eviction and closed quickly",
        createdAt: new Date(),
      },
    ];

    sampleGalleryPhotos.forEach(photo => this.galleryPhotos.set(photo.id, photo));

    // Seed testimonials
    const sampleTestimonials: Testimonial[] = [
      {
        id: randomUUID(),
        customerName: "Sarah M.",
        situation: "Inherited property seller",
        city: "kuna",
        rating: "5",
        testimonial: "After inheriting my parents' house in Kuna, I needed to sell quickly. HomeBuyerBoise made a fair offer and closed in just 10 days. No repairs, no stress, just a smooth transaction.",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        customerName: "Mike R.",
        situation: "Job relocation",
        city: "boise",
        rating: "5",
        testimonial: "When my job relocated me to Seattle on short notice, I needed to sell fast. They gave me a cash offer the same day and we closed in two weeks. Couldn't have asked for an easier process.",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        customerName: "Jennifer K.",
        situation: "Divorce settlement",
        city: "meridian",
        rating: "5",
        testimonial: "Going through a divorce was hard enough. HomeBuyerBoise handled our house sale with discretion and professionalism. Fair price, quick closing, and they took care of everything.",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        customerName: "David L.",
        situation: "Foreclosure avoidance",
        city: "nampa",
        rating: "5",
        testimonial: "I was behind on my mortgage and facing foreclosure. They worked with my timeline, paid off the loan, and helped me avoid damaging my credit. True lifesavers!",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        customerName: "Amanda T.",
        situation: "Downsizing",
        city: "eagle",
        rating: "5",
        testimonial: "After our kids moved out, we wanted to downsize. HomeBuyerBoise bought our large family home as-is, so we didn't have to deal with repairs or staging. Quick and painless!",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        customerName: "Robert C.",
        situation: "Problem tenant",
        city: "star",
        rating: "5",
        testimonial: "Had a rental property with terrible tenants I couldn't evict. Sold it to HomeBuyerBoise tenant and all. They handled the eviction and I walked away with cash in hand.",
        createdAt: new Date(),
      },
    ];

    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));

    // Seed blog posts from blogContent.ts
    const blogPostsFromContent: BlogPost[] = BLOG_POSTS.map(post => ({
      id: randomUUID(),
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags,
      publishedAt: new Date(post.publishedAt),
      createdAt: new Date(),
    }));

    blogPostsFromContent.forEach(post => this.blogPosts.set(post.id, post));
    
    // Seed test users for development (hardcoded IDs match frontend)
    const testUsers: User[] = [
      {
        id: "admin-temp-id",
        email: "admin@lawncarekuna.com",
        firstName: "Admin",
        lastName: "User",
        phone: null,
        role: "admin",
        company: null,
        licenseNumber: null,
        insuranceExpiry: null,
        profileImageUrl: null,
        agreementAccepted: false,
        agreementAcceptedAt: null,
        stripeCustomerId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "sub-temp-id",
        email: "contractor@example.com",
        firstName: "Test",
        lastName: "Subcontractor",
        phone: null,
        role: "subcontractor",
        company: null,
        licenseNumber: null,
        insuranceExpiry: null,
        profileImageUrl: null,
        agreementAccepted: true,
        agreementAcceptedAt: new Date(),
        stripeCustomerId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    
    testUsers.forEach(user => this.users.set(user.id, user));
  }

  // Quote methods
  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = {
      ...insertQuote,
      address: insertQuote.address ?? null,
      propertySize: insertQuote.propertySize ?? null,
      frequency: insertQuote.frequency ?? null,
      message: insertQuote.message ?? null,
      selectedServices: insertQuote.selectedServices ?? null,
      acceptedAt: null,
      id,
      createdAt: new Date(),
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getQuoteById(id: string): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  // Property Offer methods (cash home buying)
  async createPropertyOffer(insertOffer: InsertPropertyOffer): Promise<PropertyOffer> {
    const id = randomUUID();
    const now = new Date();
    
    // Create the property offer with proper null handling
    const propertyOffer: PropertyOffer = {
      // Required fields
      id,
      name: insertOffer.name,
      email: insertOffer.email,
      phone: insertOffer.phone,
      city: insertOffer.city,
      state: insertOffer.state ?? "Idaho",
      propertyType: insertOffer.propertyType,
      condition: insertOffer.condition,
      consentToContact: insertOffer.consentToContact,
      status: insertOffer.status ?? "pending",
      createdAt: now,
      updatedAt: now,
      
      // Optional fields - preserve undefined/null as-is
      address: insertOffer.address ?? null,
      street: insertOffer.street ?? null,
      zip: insertOffer.zip ?? null,
      fullAddress: insertOffer.fullAddress ?? null,
      beds: insertOffer.beds ?? null,
      baths: insertOffer.baths ?? null,
      squareFeet: insertOffer.squareFeet ?? null,
      reasonForSelling: insertOffer.reasonForSelling ?? null,
      timeline: insertOffer.timeline ?? null,
      desiredClosingDate: insertOffer.desiredClosingDate ?? null,
      estimatedMarketValue: insertOffer.estimatedMarketValue ?? null,
      avmSource: insertOffer.avmSource ?? null,
      avmConfidence: insertOffer.avmConfidence ?? null,
      avmFetchedAt: null,
      avmRaw: insertOffer.avmRaw ?? null,
      avmFailureReason: insertOffer.avmFailureReason ?? null,
      estimatedRepairs: insertOffer.estimatedRepairs ?? null,
      offerLow: insertOffer.offerLow ?? null,
      offerHigh: insertOffer.offerHigh ?? null,
      anchorOffer: insertOffer.anchorOffer ?? null,
      calculationInputs: insertOffer.calculationInputs ?? null,
      consentToText: insertOffer.consentToText ?? null,
      consentToEmail: insertOffer.consentToEmail ?? null,
      contactedAt: null,
      offerMadeAt: null,
      acceptedAt: null,
      scheduledClosingDate: insertOffer.scheduledClosingDate ?? null,
      message: insertOffer.message ?? null,
      notes: insertOffer.notes ?? null,
    };
    
    this.propertyOffers.set(id, propertyOffer);
    return propertyOffer;
  }

  async getAllPropertyOffers(): Promise<PropertyOffer[]> {
    return Array.from(this.propertyOffers.values());
  }

  async getPropertyOfferById(id: string): Promise<PropertyOffer | undefined> {
    return this.propertyOffers.get(id);
  }

  async updatePropertyOffer(id: string, data: Partial<PropertyOffer>): Promise<PropertyOffer | undefined> {
    const existing = this.propertyOffers.get(id);
    if (!existing) return undefined;
    
    const updated: PropertyOffer = {
      ...existing,
      ...data,
      id: existing.id, // Prevent ID override
      createdAt: existing.createdAt, // Prevent createdAt override
      updatedAt: new Date(),
    };
    this.propertyOffers.set(id, updated);
    return updated;
  }

  // Gallery photo methods
  async createGalleryPhoto(insertPhoto: InsertGalleryPhoto): Promise<GalleryPhoto> {
    const id = randomUUID();
    const photo: GalleryPhoto = {
      ...insertPhoto,
      description: insertPhoto.description ?? null,
      id,
      createdAt: new Date(),
    };
    this.galleryPhotos.set(id, photo);
    return photo;
  }

  async getAllGalleryPhotos(): Promise<GalleryPhoto[]> {
    return Array.from(this.galleryPhotos.values());
  }

  async getGalleryPhotosByService(serviceType: string): Promise<GalleryPhoto[]> {
    // For cash home buying, we show all property examples regardless of category
    // The serviceType parameter is kept for API compatibility but not used for filtering
    return Array.from(this.galleryPhotos.values());
  }

  // Testimonial methods
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      createdAt: new Date(),
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonialsByService(serviceType: string): Promise<Testimonial[]> {
    // For cash home buying, we show all testimonials regardless of situation
    // The serviceType parameter is kept for API compatibility but not used for filtering
    return Array.from(this.testimonials.values());
  }

  // Blog post methods
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    // Check for slug uniqueness
    const existing = Array.from(this.blogPosts.values()).find(
      post => post.slug === insertPost.slug
    );
    if (existing) {
      throw new Error(`Blog post with slug "${insertPost.slug}" already exists`);
    }

    const id = randomUUID();
    const post: BlogPost = {
      ...insertPost,
      id,
      createdAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      post => post.slug === slug
    );
  }

  // User methods (Replit Auth compatible)
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const id = userData.id || randomUUID();
    const existing = this.users.get(id);
    
    const user: User = {
      id,
      email: userData.email ?? null,
      firstName: userData.firstName ?? null,
      lastName: userData.lastName ?? null,
      profileImageUrl: userData.profileImageUrl ?? null,
      phone: userData.phone ?? null,
      role: userData.role ?? "subcontractor",
      company: userData.company ?? null,
      licenseNumber: userData.licenseNumber ?? null,
      insuranceExpiry: userData.insuranceExpiry ?? null,
      agreementAccepted: userData.agreementAccepted ?? false,
      agreementAcceptedAt: userData.agreementAcceptedAt ?? null,
      stripeCustomerId: userData.stripeCustomerId ?? null,
      isActive: userData.isActive ?? true,
      createdAt: existing?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    
    this.users.set(id, user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email === email);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updated: User = {
      ...user,
      ...data,
      updatedAt: new Date(),
    };
    this.users.set(id, updated);
    return updated;
  }

  async getAllSubcontractors(): Promise<User[]> {
    return Array.from(this.users.values()).filter(u => u.role === "subcontractor" && u.isActive);
  }

  async getAllAdmins(): Promise<User[]> {
    return Array.from(this.users.values()).filter(u => u.role === "admin" && u.isActive);
  }

  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    
    // Ensure baseLeadPrice and currentLeadPrice are set
    const baseLeadPrice = insertLead.baseLeadPrice || "0";
    const currentLeadPrice = insertLead.currentLeadPrice || baseLeadPrice;
    
    const lead: Lead = {
      ...insertLead,
      quoteId: insertLead.quoteId ?? null,
      address: insertLead.address ?? null,
      selectedServices: insertLead.selectedServices ?? null,
      frequency: insertLead.frequency ?? null,
      finalQuote: insertLead.finalQuote ?? null,
      lineItems: insertLead.lineItems ?? null,
      serviceData: insertLead.serviceData ?? null,
      message: insertLead.message ?? null,
      baseLeadPrice,
      currentLeadPrice,
      status: insertLead.status ?? "pending_admin",
      priceReductionRate: insertLead.priceReductionRate ?? "1.50",
      adminDeclined: insertLead.adminDeclined ?? false,
      lastPriceUpdate: new Date(),
      adminReviewedBy: insertLead.adminReviewedBy ?? null,
      adminReviewedAt: null,
      purchasedBy: insertLead.purchasedBy ?? null,
      purchasedAt: null,
      purchasePrice: insertLead.purchasePrice ?? null,
      stripePaymentIntentId: insertLead.stripePaymentIntentId ?? null,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async getLeadsByStatus(status: string): Promise<Lead[]> {
    return Array.from(this.leads.values())
      .filter(lead => lead.status === status)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getLeadsForSubcontractor(filters?: { city?: string; serviceType?: string; maxPrice?: number }): Promise<Lead[]> {
    let leads = Array.from(this.leads.values()).filter(lead => lead.status === "available");

    if (filters?.city) {
      leads = leads.filter(lead => lead.city.toLowerCase() === filters.city!.toLowerCase());
    }

    if (filters?.serviceType) {
      leads = leads.filter(lead => 
        lead.serviceType.toLowerCase().includes(filters.serviceType!.toLowerCase()) ||
        lead.selectedServices?.some(s => s.toLowerCase().includes(filters.serviceType!.toLowerCase()))
      );
    }

    if (filters?.maxPrice) {
      leads = leads.filter(lead => {
        const price = parseFloat(lead.currentLeadPrice as string);
        return !isNaN(price) && price <= filters.maxPrice!;
      });
    }

    return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (!lead) return undefined;

    const updated: Lead = {
      ...lead,
      ...data,
      updatedAt: new Date(),
    };
    this.leads.set(id, updated);
    return updated;
  }

  async updateLeadPrices(): Promise<void> {
    const now = new Date();
    const oneDayMs = 24 * 60 * 60 * 1000;

    for (const lead of Array.from(this.leads.values())) {
      if (lead.status === "available" && lead.lastPriceUpdate) {
        const hoursSinceUpdate = (now.getTime() - new Date(lead.lastPriceUpdate).getTime()) / (1000 * 60 * 60);
        
        if (hoursSinceUpdate >= 24) {
          const currentPrice = parseFloat(lead.currentLeadPrice as string);
          const reductionRate = parseFloat(lead.priceReductionRate as string) / 100;
          const newPrice = currentPrice * (1 - reductionRate);
          
          const minPrice = parseFloat(lead.baseLeadPrice as string) * 0.5;
          const finalPrice = Math.max(newPrice, minPrice);

          await this.updateLead(lead.id, {
            currentLeadPrice: finalPrice.toFixed(2),
            lastPriceUpdate: now,
          });
        }
      }
    }
  }

  async acceptLead(leadId: string, adminUserId: string): Promise<Lead | undefined> {
    const lead = this.leads.get(leadId);
    if (!lead || lead.status !== "pending_admin") return undefined;

    return await this.updateLead(leadId, {
      status: "accepted",
      adminReviewedBy: adminUserId,
      adminReviewedAt: new Date(),
      adminDeclined: false,
    });
  }

  async declineLead(leadId: string, adminUserId: string): Promise<Lead | undefined> {
    const lead = this.leads.get(leadId);
    if (!lead || lead.status !== "pending_admin") return undefined;

    return await this.updateLead(leadId, {
      status: "available",
      adminReviewedBy: adminUserId,
      adminReviewedAt: new Date(),
      adminDeclined: true,
    });
  }

  // Lead Purchase methods
  async createLeadPurchase(insertPurchase: InsertLeadPurchase): Promise<LeadPurchase> {
    const id = randomUUID();
    const purchase: LeadPurchase = {
      ...insertPurchase,
      stripeChargeId: insertPurchase.stripeChargeId ?? null,
      refunded: insertPurchase.refunded ?? false,
      refundReason: insertPurchase.refundReason ?? null,
      refundedAt: null,
      id,
      createdAt: new Date(),
    };
    this.leadPurchases.set(id, purchase);
    return purchase;
  }

  async getLeadPurchasesByUser(userId: string): Promise<LeadPurchase[]> {
    return Array.from(this.leadPurchases.values())
      .filter(p => p.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getLeadPurchaseByLead(leadId: string): Promise<LeadPurchase | undefined> {
    return Array.from(this.leadPurchases.values()).find(p => p.leadId === leadId);
  }

  // Notification methods
  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = {
      ...insertNotification,
      leadId: insertNotification.leadId ?? null,
      read: insertNotification.read ?? false,
      emailSent: insertNotification.emailSent ?? false,
      emailSentAt: null,
      id,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async markNotificationRead(id: string): Promise<void> {
    const notification = this.notifications.get(id);
    if (notification) {
      this.notifications.set(id, {
        ...notification,
        read: true,
      });
    }
  }

  async markNotificationEmailSent(id: string): Promise<void> {
    const notification = this.notifications.get(id);
    if (notification) {
      this.notifications.set(id, {
        ...notification,
        emailSent: true,
        emailSentAt: new Date(),
      });
    }
  }

  // Alias methods for API consistency
  async getLeadPurchaseByLeadId(leadId: string): Promise<LeadPurchase | undefined> {
    return this.getLeadPurchaseByLead(leadId);
  }

  async getNotificationsByUserId(userId: string): Promise<Notification[]> {
    return this.getNotificationsByUser(userId);
  }

  async markNotificationAsRead(id: string): Promise<Notification | undefined> {
    await this.markNotificationRead(id);
    return this.notifications.get(id);
  }
}

export const storage = new MemStorage();
