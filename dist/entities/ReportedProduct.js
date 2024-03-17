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
exports.ReportedMenu = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Menu_1 = require("./Menu");
const class_validator_1 = require("class-validator");
const Types_1 = require("../Types");
let ReportedMenu = class ReportedMenu extends typeorm_1.BaseEntity {
};
exports.ReportedMenu = ReportedMenu;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReportedMenu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], ReportedMenu.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Types_1.ReviewStatus, default: Types_1.ReviewStatus.OnReview }),
    __metadata("design:type", String)
], ReportedMenu.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.reportProduct, {
        nullable: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", User_1.User)
], ReportedMenu.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Menu_1.Menu, (menu) => menu.reportMenu, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Menu_1.Menu)
], ReportedMenu.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReportedMenu.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReportedMenu.prototype, "updated_at", void 0);
exports.ReportedMenu = ReportedMenu = __decorate([
    (0, typeorm_1.Entity)("reportedMenues")
], ReportedMenu);
