import { Request, Response } from "express";
import { Category } from "../models/Category";
import { Product } from "../models/Product";

class CategoryController {
  async index(req: Request, res: Response) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, icon } = req.body;
      const category = await Category.create({ name, icon });
      res.status(201).json(category);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const products = await Product.find().where("category").equals(id);
    console.log(products);

    res.status(200).json(products);
  }
}

export default new CategoryController();
