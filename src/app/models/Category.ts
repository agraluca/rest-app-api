import { model, Schema } from "mongoose";

const CategoryObjectSchema = {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
    required: true,
  },
};

export const CategorySchema = new Schema(CategoryObjectSchema);

export const Category = model("Category", CategorySchema);
