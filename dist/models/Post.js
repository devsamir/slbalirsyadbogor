"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./User"));
let Post = class Post {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default, (User) => User.id, { nullable: false }),
    __metadata("design:type", Number)
], Post.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined({ message: "Judul Tidak Boleh Kosong" }),
    class_validator_1.MinLength(1, { message: "Judul Tidak Boleh Kosong" }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: "default-thumbnail.png" }),
    __metadata("design:type", String)
], Post.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column("text"),
    class_validator_1.IsDefined({ message: "Isi Artikel Tidak Boleh Kosong" }),
    class_validator_1.MinLength(1, { message: "Isi Artikel Tidak Boleh Kosong" }),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "viewer", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
Post = __decorate([
    typeorm_1.Entity()
], Post);
exports.default = Post;
//# sourceMappingURL=Post.js.map