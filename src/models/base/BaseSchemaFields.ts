import { Schema } from "mongoose";

// Shared field set applied to every content collection (Section 3 of the spec).
// Apply with `{ timestamps: true }` on the parent schema for createdAt / updatedAt.
export const baseFields = {
  status: {
    type: String,
    enum: ["Draft", "Published", "Archived"],
    default: "Draft",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
};

