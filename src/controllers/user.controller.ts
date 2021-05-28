import { unlink } from "fs/promises";
import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";
import { validate } from "class-validator";
import bcrypt from "bcryptjs";
import multer, { DiskStorageOptions, FileFilterCallback } from "multer";

import catchAsync from "../utils/catchAsync";
import User from "../models/User";
import AppError from "../utils/appError";
import formError from "../utils/formError";
import { v4 } from "uuid";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/uploads`);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".");
    const extension = ext[ext.length - 1];
    cb(null, `avatar-${v4()}.${extension}`);
  },
} as DiskStorageOptions);

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  cb(null, true);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
export const uploadAvatar = upload.single("avatar");

export const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const manager = getManager();
    const user = await manager.find(User, {
      select: ["id", "username", "email", "avatar"],
      where: { active: true },
    });
    res.status(200).json(user);
  }
);
export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password, repassword, email } = req.body;
    let image = {} as any;
    if (req.file) image.avatar = req.file.path;
    const manager = getManager();
    if (password.length < 8)
      return next(
        new AppError("Password Harus Terdiri Lebih Dari 8 Karakter", 400)
      );
    if (password !== repassword)
      return next(new AppError("Password Harus Sama", 400));
    const newPassword = await bcrypt.hash(password, 10);
    const newUser = manager.create(User, {
      username,
      password: newPassword,
      email: email,
      ...image,
    });
    const errors = await validate(newUser);
    if (errors.length > 0) return formError(errors, res);
    await manager.save(newUser);
    res.status(201).json(newUser);
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { username, oldPassword, password, repassword, email } = req.body;
    let image = {} as any;
    if (req.file) image.avatar = req.file.path;
    const manager = getManager();
    const user = await manager.findOne(User, { where: { id } });
    if (!user) return next(new AppError("User Tidak Ditemukan", 400));
    const oldPath = user.avatar; // Untuk Hapus Foto Yang Hendak Di Update
    const cekUser = await bcrypt.compare(oldPassword, user.password);
    if (!cekUser) return next(new AppError("Password Lama Tidak Sama", 400));
    if (password.length < 8)
      return next(
        new AppError("Password Harus Terdiri Lebih Dari 8 Karakter", 400)
      );
    if (password !== repassword)
      return next(new AppError("Password Harus Sama", 400));
    const newPassword = await bcrypt.hash(password, 10);
    const newUser = manager.create(User, {
      id,
      username,
      password: newPassword,
      email: email,
      ...image,
    });
    const errors = await validate(newUser);
    if (errors.length > 0) return formError(errors, res);
    await manager.update(
      User,
      { id },
      { username, password: newPassword, email, ...image }
    );
    await unlink(oldPath);
    res.status(201).json(newUser);
  }
);
export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const manager = getManager();
    await manager.update(User, { id }, { active: false });

    res.status(204).json(null);
  }
);
