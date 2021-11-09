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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Teacher = class Teacher {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], Teacher.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined({ message: "Nama Guru Harus Diisi" }),
    __metadata("design:type", String)
], Teacher.prototype, "fullName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: "" }),
    __metadata("design:type", String)
], Teacher.prototype, "nuptk", void 0);
__decorate([
    typeorm_1.Column("enum", { enum: ["Pria", "Wanita"] }),
    class_validator_1.IsDefined({ message: "Jenis Kelamin Harus Diisi" }),
    class_validator_1.MinLength(1, { message: "Jenis Kelamin Harus Diisi" }),
    __metadata("design:type", String)
], Teacher.prototype, "kelamin", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined({ message: "Jabatan Harus Diisi" }),
    class_validator_1.MinLength(1, { message: "Jabatan Harus Diisi" }),
    __metadata("design:type", String)
], Teacher.prototype, "jabatan", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: "" }),
    __metadata("design:type", String)
], Teacher.prototype, "pelajaran", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: "public/uploads/default-teacher.jpg" }),
    __metadata("design:type", String)
], Teacher.prototype, "photo", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Teacher.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Teacher.prototype, "updatedAt", void 0);
Teacher = __decorate([
    typeorm_1.Entity()
], Teacher);
exports.default = Teacher;
//# sourceMappingURL=Teacher.js.map