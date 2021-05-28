// const express = require("express");
import path from "path";
import express from "express";
import { Request, Response, Application } from "express";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import exphbs from "express-handlebars";
import "reflect-metadata";
// Models
import Extracurricular from "./models/Extracurricular";
import Post from "./models/Post";
import Suggestion from "./models/Suggestion";
import Teacher from "./models/Teacher";
import User from "./models/User";

// Router
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import viewRouter from "./routes/view.routes";

import errorHandler from "./utils/errorHandler";

dotenv.config();

const main = async (): Promise<void> => {
  try {
    await createConnection({
      type: "mysql",
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [Extracurricular, Post, Suggestion, Teacher, User],
    });
    console.log("Database Connected");

    const app: Application = express();

    app.use(express.json());
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

    app.use(cookieParser());
    app.use(helmet());
    app.use(
      cors({
        origin: process.env.BASE_URL,
        credentials: true,
      })
    );

    app.engine(
      ".hbs",
      exphbs({
        extname: ".hbs",
        partialsDir: path.join(__dirname, "../views"),
        layoutsDir: path.join(__dirname, "../views"),
      })
    );
    app.set("view engine", ".hbs");
    app.use("/public", express.static(path.join(__dirname, "../public")));

    app.use("/api/user", userRouter);
    app.use("/api/auth", authRouter);
    app.use("/", viewRouter);

    app.use(errorHandler);

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`App Running in Port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
