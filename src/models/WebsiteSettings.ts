import { Schema, model, models } from "mongoose";

const SocialLinksSchema = new Schema(
  {
    facebook: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    youtube: { type: String, trim: true },
    twitter: { type: String, trim: true },
    instagram: { type: String, trim: true },
  },
  { _id: false }
);

const SeoDefaultsSchema = new Schema(
  {
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    keywords: [{ type: String, trim: true }],
    ogImage: { type: String },
  },
  { _id: false }
);

const SmtpSchema = new Schema(
  {
    host: { type: String },
    port: { type: Number },
    username: { type: String },
    password: { type: String, select: false },
    senderName: { type: String },
    senderEmail: { type: String },
  },
  { _id: false }
);

const CloudinarySchema = new Schema(
  {
    cloudName: { type: String },
    apiKey: { type: String },
    apiSecret: { type: String, select: false },
  },
  { _id: false }
);

const WebsiteSettingsSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true, default: "IdeaCT" },
    logo: { type: String },
    favicon: { type: String },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    mapUrl: { type: String, trim: true },
    businessHours: { type: String, trim: true },
    socialLinks: { type: SocialLinksSchema, default: () => ({}) },
    seo: { type: SeoDefaultsSchema, default: () => ({}) },
    smtp: { type: SmtpSchema, default: () => ({}) },
    cloudinary: { type: CloudinarySchema, default: () => ({}) },
    aboutUs: { type: String },
    mission: { type: String },
    vision: { type: String },
    companyHistory: { type: String },

    defaultLocale: { type: String, enum: ["en"], default: "en" },
    supportedLocales: { type: [String], enum: ["en"], default: ["en"] },
  },
  { timestamps: true }
);

export default models.WebsiteSettings || model("WebsiteSettings", WebsiteSettingsSchema);
