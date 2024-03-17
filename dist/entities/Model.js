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
exports.Model = void 0;
const typeorm_1 = require("typeorm");
const Menu_1 = require("./Menu");
const Color_1 = require("./Color");
const OrderItems_1 = require("./OrderItems");
const Cart_1 = require("./Cart");
let Model = class Model extends typeorm_1.BaseEntity {
};
exports.Model = Model;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Model.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Model.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Model.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Model.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Menu_1.Product, (product) => product.models, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Menu_1.Product)
], Model.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Color_1.Color, (colors) => colors.model),
    __metadata("design:type", Array)
], Model.prototype, "colors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cart_1.Cart, (cart) => cart.model),
    __metadata("design:type", Array)
], Model.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderItems_1.OrderItem, (orderItem) => orderItem.color),
    __metadata("design:type", Array)
], Model.prototype, "orderItem", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Model.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Model.prototype, "updated_at", void 0);
exports.Model = Model = __decorate([
    (0, typeorm_1.Entity)("models")
], Model);
