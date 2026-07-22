import { Schema, model, models } from "mongoose";
import { baseFields } from "./base/BaseSchemaFields";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    thumbnail: { type: String },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "BlogCategory" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    ...baseFields,
  },
  { timestamps: true }
);

BlogSchema.index({ category: 1, status: 1, createdAt: -1 });

export default models.Blog || model("Blog", BlogSchema);
