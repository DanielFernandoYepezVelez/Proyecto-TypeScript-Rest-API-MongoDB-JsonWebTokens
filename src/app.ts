import dotenv from "dotenv";
dotenv.config();
import "./config/database";

import express, { Application } from "express";
import morgan from "morgan";

import authRouter from "./routes/auth.routes";

class App {
  constructor(private app: Application) {}

  public settings(): void {
    this.app.set("port", process.env.PORT || 3000);
  }

  public middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  public routes(): void {
    this.app.use("/api/auth", authRouter);
  }

  public async start(): Promise<void> {
    try {
      await this.app.listen(this.app.get("port"));
      console.log(`Server On Port ${this.app.get("port")}`);
    } catch {
      console.log("No Exist PORT!");
    }
  }
}

const application = new App(express());
export default application;
