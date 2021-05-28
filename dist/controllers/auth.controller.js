"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogged = exports.logout = exports.protect = exports.login = void 0;
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const User_1 = __importDefault(require("../models/User"));
const appError_1 = __importDefault(require("../utils/appError"));
dotenv_1.default.config();
const login = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const manager = typeorm_1.getManager();
    let user = yield manager.findOne(User_1.default, {
        where: { username, active: true },
    });
    if (!user) {
        user = yield manager.findOne(User_1.default, {
            where: { email: username, active: true },
        });
        if (!user)
            return next(new appError_1.default("Username atau Password Salah !", 400));
    }
    const cekPass = yield bcryptjs_1.default.compare(password, user.password);
    if (!cekPass)
        return next(new appError_1.default("Username atau Password Salah !", 400));
    const jwtSecret = process.env.JWT_SECRET;
    const token = jsonwebtoken_1.default.sign({ username, email: user.email, avatar: user.avatar, id: user.id }, jwtSecret, {
        expiresIn: "1d",
    });
    res.cookie("jwt", token, { httpOnly: true });
    res
        .status(200)
        .json({ username, email: user.email, avatar: user.avatar, id: user.id });
}));
exports.login = login;
const protect = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = typeorm_1.getManager();
    const jwtSecret = process.env.JWT_SECRET;
    if (!req.cookies.jwt)
        return res.redirect("/login");
    const token = yield jsonwebtoken_1.default.verify(req.cookies.jwt, jwtSecret);
    const user = yield manager.findOne(User_1.default, {
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
}));
exports.protect = protect;
const isLogged = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = typeorm_1.getManager();
    const jwtSecret = process.env.JWT_SECRET;
    if (req.cookies.jwt) {
        const token = yield jsonwebtoken_1.default.verify(req.cookies.jwt, jwtSecret);
        const user = yield manager.findOne(User_1.default, {
            where: { id: token.id, active: true },
        });
        if (user) {
            return res.status(200).redirect("/admin/user");
        }
    }
    next();
}));
exports.isLogged = isLogged;
const logout = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("jwt");
    res.status(200).redirect("/login");
}));
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map