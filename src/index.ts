import express from "express";

import path from "node:path";

import env from "dotenv";

import { connectOnDB } from "./db";

import { routes } from "./app/routes";

env.config();

const PORT = process.env.PORT || 4000;

connectOnDB(() => {
  const app = express();

  app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
  app.use(express.json());

  app.use(routes);

  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
});
