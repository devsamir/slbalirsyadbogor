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
let Suggestion = class Suggestion {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], Suggestion.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsDefined({ message: "Nama Harus Diisi" }),
    class_validator_1.MinLength(1, { message: "Nama Harus Disii" }),
    __metadata("design:type", String)
], Suggestion.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Suggestion.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Suggestion.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column("text"),
    class_validator_1.IsDefined({ message: "Saran & Kritik Harus Diisi" }),
    class_validator_1.MinLength(1, { message: "Saran & Kritik Harus Disii" }),
    __metadata("design:type", String)
], Suggestion.prototype, "saran", void 0);
__decorate([
    typeorm_1.Column("boolean", { default: false }),
    __metadata("design:type", Boolean)
], Suggestion.prototype, "dibaca", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Suggestion.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Suggestion.prototype, "updatedAt", void 0);
Suggestion = __decorate([
    typeorm_1.Entity()
], Suggestion);
exports.default = Suggestion;
//# sourceMappingURL=Suggestion.js.map