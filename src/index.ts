// const express = require("express");
import path from "path";
import express, { NextFunction } from "express";
import { Request, Response, Application } from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import exphbs from "express-handlebars";
import "reflect-metadata";

import {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  BASE_URL,
  NODE_ENV,
  PORT,
} from "./env";
// Models
import Extracurricular from "./models/Extracurricular";
import Post from "./models/Post";
import Suggestion from "./models/Suggestion";
import Teacher from "./models/Teacher";
import User from "./models/User";
import Gallery from "./models/Gallery";
import Landing from "./models/Landing";
import Profil from "./models/Profil";
import Halaman from "./models/Halaman";
import Agenda from "./models/Agenda";
import Student from "./models/Student";
import Pembelajaran from "./models/Pembelajaran";
import Prestasi from "./models/Prestasi";

// Router
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import teacherRouter from "./routes/teacher.routes";
import postRouter from "./routes/post.routes";
import viewRouter from "./routes/view.routes";
import extraRouter from "./routes/extra.routes";
import galleryRouter from "./routes/gallery.routes";
import homeRouter from "./routes/home.routes";
import landingRouter from "./routes/landing.routes";
import adminRouter from "./routes/admin.routes";
import suggestionRouter from "./routes/suggestion.routes";
import profilRouter from "./routes/profil.routes";
import halamanRouter from "./routes/halaman.routes";
import agendaRouter from "./routes/agenda.routes";
import studentRouter from "./routes/student.routes";
import pembelajaranRouter from "./routes/pembelajaran.routes";
import prestasiRouter from "./routes/prestasi.routes";

import errorHandler from "./utils/errorHandler";

const main = async (): Promise<void> => {
  try {
    await createConnection({
      type: "mysql",
      host: DB_HOST,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      synchronize: true,
      logging: true,
      entities: [
        Extracurricular,
        Post,
        Suggestion,
        Teacher,
        User,
        Gallery,
        Landing,
        Profil,
        Halaman,
        Agenda,
        Student,
        Pembelajaran,
        Prestasi,
      ],
    });
    console.log("Database Connected");

    const app: Application = express();

    app.use(express.json());
    if (NODE_ENV === "development") app.use(morgan("dev"));

    app.use(cookieParser());
    app.use(helmet());
    app.use(
      cors({
        origin: BASE_URL,
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
    app.use("/assets", express.static(path.join(__dirname, "../assets")));

    app.use(function (req, res, next) {
      res.setHeader(
        "Content-Security-Policy",
        "default-src * 'unsafe-inline'; script-src * 'unsafe-inline'; img-src * data:"
      );
      return next();
    });

    app.use("/api/user", userRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/teacher", teacherRouter);
    app.use("/api/post", postRouter);
    app.use("/api/extra", extraRouter);
    app.use("/api/gallery", galleryRouter);
    app.use("/api/landing", landingRouter);
    app.use("/api/home", homeRouter);
    app.use("/api/suggestion", suggestionRouter);
    app.use("/api/profil", profilRouter);
    app.use("/api/halaman", halamanRouter);
    app.use("/api/agenda", agendaRouter);
    app.use("/api/student", studentRouter);
    app.use("/api/pembelajaran", pembelajaranRouter);
    app.use("/api/prestasi", prestasiRouter);
    app.use("/admin", adminRouter);
    app.use("/", viewRouter);

    app.get("*", (req: Request, res: Response, next: NextFunction) => {
      res.render("v_notfound", { layout: false });
    });

    app.use(errorHandler);

    const port = PORT || 4000;

    app.listen(port, () => {
      console.log(`App Running in Port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();
