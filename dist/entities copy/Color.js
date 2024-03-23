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
exports.Color = void 0;
const typeorm_1 = require("typeorm");
const OrderItems_1 = require("./OrderItems");
const Cart_1 = require("./Cart");
let Color = class Color extends typeorm_1.BaseEntity {
};
exports.Color = Color;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Color.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Color.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Color.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cart_1.Cart, (cart) => cart.color),
    __metadata("design:type", Array)
], Color.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => OrderItems_1.OrderItem, (orderItem) => orderItem.color),
    __metadata("design:type", OrderItems_1.OrderItem)
], Color.prototype, "orderItem", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Color.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Color.prototype, "updated_at", void 0);
exports.Color = Color = __decorate([
    (0, typeorm_1.Entity)("colors")
], Color);
