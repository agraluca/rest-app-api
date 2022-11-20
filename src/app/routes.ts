import path from "node:path";

import { Router } from "express";

import CategoryController from "./controllers/CategoryController";
import OrderController from "./controllers/OrderController";
import ProductController from "./controllers/ProductController";

import multer from "multer";

export const routes = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "..", "uploads"));
    },
    filename(req, file, callback) {
      const fileName = `${Date.now()}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
});

routes.get("/categories", CategoryController.index);
routes.post("/category", CategoryController.store);
routes.delete("/category/:id", CategoryController.delete);
routes.get("/categories/:id/products", CategoryController.show);

routes.get("/products", ProductController.index);
routes.post("/product", upload.single("image"), ProductController.store);

routes.get("/orders", OrderController.index);
routes.post("/order", OrderController.store);
routes.patch("/order/:id", OrderController.update);
routes.delete("/order/:id", OrderController.delete);
