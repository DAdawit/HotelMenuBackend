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
exports.SubCategory = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const class_validator_1 = require("class-validator");
const Menu_1 = require("./Menu");
const host_1 = require("../utils/host");
let SubCategory = class SubCategory extends typeorm_1.BaseEntity {
    loadImagePath() {
        const baseUrl = (0, host_1.getBaseUrl)();
        this.imageUrl = baseUrl + this.image;
    }
    convertNameToLowercase() {
        this.name = this.name.toLowerCase();
    }
};
exports.SubCategory = SubCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SubCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], SubCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.subCategory, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Category_1.Category)
], SubCategory.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SubCategory.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubCategory.prototype, "loadImagePath", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => Menu_1.Menu, (menu) => menu.subCategory),
    __metadata("design:type", Menu_1.Menu)
], SubCategory.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SubCategory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SubCategory.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubCategory.prototype, "convertNameToLowercase", null);
exports.SubCategory = SubCategory = __decorate([
    (0, typeorm_1.Entity)("subCategories")
], SubCategory);
