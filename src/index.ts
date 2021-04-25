import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";

import "module-alias/register";

import authRoutes from "./auth/auth.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (_, res) => res.send("Hello world"));
app.use("/api/auth", authRoutes);

app.listen(5000, async () => {
  console.log("Server running on port 5000");
  try {
    await createConnection();
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
});
