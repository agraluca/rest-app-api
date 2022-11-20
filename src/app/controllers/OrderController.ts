import { Request, Response } from "express";

import { Order } from "../models/Order";

class OrderController {
  async index(req: Request, res: Response) {
    try {
      const orders = await Order.find()
        .sort({ createdAt: 1 })
        .populate("products.product");
      res.status(200).json(orders);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
  async store(req: Request, res: Response) {
    try {
      const { table, products } = req.body;
      const order = await Order.create({ table, products });
      res.status(201).json(order);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
        res.status(400).json({
          error: "Status should be: WAITING, IN_PRODUCTION, DONE",
        });
      }

      await Order.findByIdAndUpdate(id, { status });
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await Order.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
}

export default new OrderController();
