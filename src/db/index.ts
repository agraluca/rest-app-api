import mongoose from "mongoose";

const url = process.env.CONNECTION_MONGO ?? "mongodb://localhost:27017";

export const connectOnDB = (cb: () => void) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Conectado ao mongo");
      cb();
    })
    .catch(() => console.log("Erro ao conectar ao mongo"));
};
