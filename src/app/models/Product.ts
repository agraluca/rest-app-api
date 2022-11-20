import { model, Schema } from "mongoose";
import { CategorySchema } from "./Category";

const ProductObjectSchema = {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: [CategorySchema],
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
};

const ProductSchema = new Schema(ProductObjectSchema);

export const Product = model("Product", ProductSchema);
