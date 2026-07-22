import { Schema, model, models } from "mongoose";

const HeroSlideSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    buttonText: { type: String, required: true, trim: true },
    buttonLink: { type: String, required: true, trim: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.HeroSlide || model("HeroSlide", HeroSlideSchema);
