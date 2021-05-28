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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUser = exports.uploadAvatar = void 0;
const promises_1 = require("fs/promises");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const multer_1 = __importDefault(require("multer"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const User_1 = __importDefault(require("../models/User"));
const appError_1 = __importDefault(require("../utils/appError"));
const formError_1 = __importDefault(require("../utils/formError"));
const uuid_1 = require("uuid");
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/uploads`);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".");
        const extension = ext[ext.length - 1];
        cb(null, `avatar-${uuid_1.v4()}.${extension}`);
    },
});
const multerFilter = (req, file, cb) => {
    cb(null, true);
};
const upload = multer_1.default({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadAvatar = upload.single("avatar");
exports.getAllUser = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const manager = typeorm_1.getManager();
    const user = yield manager.find(User_1.default, {
        select: ["id", "username", "email", "avatar"],
        where: { active: true },
    });
    res.status(200).json(user);
}));
exports.createUser = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, repassword, email } = req.body;
    let image = {};
    if (req.file)
        image.avatar = req.file.path;
    const manager = typeorm_1.getManager();
    if (password.length < 8)
        return next(new appError_1.default("Password Harus Terdiri Lebih Dari 8 Karakter", 400));
    if (password !== repassword)
        return next(new appError_1.default("Password Harus Sama", 400));
    const newPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = manager.create(User_1.default, Object.assign({ username, password: newPassword, email: email }, image));
    const errors = yield class_validator_1.validate(newUser);
    if (errors.length > 0)
        return formError_1.default(errors, res);
    yield manager.save(newUser);
    res.status(201).json(newUser);
}));
exports.updateUser = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, oldPassword, password, repassword, email } = req.body;
    let image = {};
    if (req.file)
        image.avatar = req.file.path;
    const manager = typeorm_1.getManager();
    const user = yield manager.findOne(User_1.default, { where: { id } });
    if (!user)
        return next(new appError_1.default("User Tidak Ditemukan", 400));
    const oldPath = user.avatar;
    const cekUser = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!cekUser)
        return next(new appError_1.default("Password Lama Tidak Sama", 400));
    if (password.length < 8)
        return next(new appError_1.default("Password Harus Terdiri Lebih Dari 8 Karakter", 400));
    if (password !== repassword)
        return next(new appError_1.default("Password Harus Sama", 400));
    const newPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = manager.create(User_1.default, Object.assign({ id,
        username, password: newPassword, email: email }, image));
    const errors = yield class_validator_1.validate(newUser);
    if (errors.length > 0)
        return formError_1.default(errors, res);
    yield manager.update(User_1.default, { id }, Object.assign({ username, password: newPassword, email }, image));
    yield promises_1.unlink(oldPath);
    res.status(201).json(newUser);
}));
exports.deleteUser = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const manager = typeorm_1.getManager();
    yield manager.update(User_1.default, { id }, { active: false });
    res.status(204).json(null);
}));
//# sourceMappingURL=user.controller.js.map