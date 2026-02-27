import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  primaryCategory: String,
  subCategory: String,
  seoTags: [String],
  sustainabilityFilters: [String],
}, { timestamps: true });

export default mongoose.model("Product", productSchema);