import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import catchAsync from "../utils/catchAsync";
import User from "../models/User";
import AppError from "../utils/appError";

dotenv.config();
const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;
    const manager = getManager();
    let user = await manager.findOne(User, {
      where: { username, active: true },
    });
    if (!user) {
      user = await manager.findOne(User, {
        where: { email: username, active: true },
      });
      if (!user)
        return next(new AppError("Username atau Password Salah !", 400));
    }
    const cekPass = await bcrypt.compare(password, user.password);
    if (!cekPass)
      return next(new AppError("Username atau Password Salah !", 400));
    const jwtSecret: any = process.env.JWT_SECRET;
    const token = jwt.sign(
      { username, email: user.email, avatar: user.avatar, id: user.id },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("jwt", token, { httpOnly: true });

    res
      .status(200)
      .json({ username, email: user.email, avatar: user.avatar, id: user.id });
  }
);
const protect = catchAsync(
  async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const manager = getManager();
    const jwtSecret: any = process.env.JWT_SECRET;
    if (!req.cookies.jwt) return res.redirect("/login");
    const token: any = await jwt.verify(req.cookies.jwt, jwtSecret);
    const user: any = await manager.findOne(User, {
      where: { id: token.id, active: true },
    });
    if (!user) {
      res.clearCookie("jwt");
      return res.redirect("/login");
    }
    user.active = undefined;
    user.password = undefined;
    req.user = user;
    next();
  }
);
const isLogged = catchAsync(
  async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const manager = getManager();
    const jwtSecret: any = process.env.JWT_SECRET;
    if (req.cookies.jwt) {
      const token: any = await jwt.verify(req.cookies.jwt, jwtSecret);
      const user: any = await manager.findOne(User, {
        where: { id: token.id, active: true },
      });
      if (user) {
        return res.status(200).redirect("/admin/user");
      }
    }
    next();
  }
);
const logout = catchAsync(
  async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    res.clearCookie("jwt");
    res.status(200).redirect("/login");
  }
);
// const restrictTo = (...roles: string[]) => {
//   return async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
//     if (roles.includes(req.user.role)) {
//       console.log(roles, req.user.role);

//       next();
//     } else {
//       next(new AppError("Anda Tidak Berhak Melakukan Operasi Ini", 400));
//     }
//   };
// };
export { login, protect, logout, isLogged };
