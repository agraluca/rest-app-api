import { Request, Response } from "express";

import { Product } from "../models/Product";

class ProductController {
  async index(req: Request, res: Response) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
  async store(req: Request, res: Response) {
    try {
      const { name, price, category, description, ingredients } = req.body;
      const imagePath = req.file?.filename;

      const product = await Product.create({
        name,
        price: Number(price),
        category,
        description,
        imagePath,
        ingredients: ingredients ? JSON.parse(ingredients) : [],
      });

      res.status(201).json(product);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

export default new ProductController();
