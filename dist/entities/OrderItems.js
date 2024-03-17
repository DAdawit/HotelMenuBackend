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
exports.OrderItem = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("./Order");
const Menu_1 = require("./Menu");
const Color_1 = require("./Color");
let OrderItem = class OrderItem extends typeorm_1.BaseEntity {
};
exports.OrderItem = OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Menu_1.Menu, (menu) => menu.orderItems),
    __metadata("design:type", Array)
], OrderItem.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Color_1.Color, (color) => color.orderItem, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Color_1.Color)
], OrderItem.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_1.Order, (order) => order.ordersItems, { onDelete: "CASCADE" }),
    __metadata("design:type", Order_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], OrderItem.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderItem.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderItem.prototype, "updated_at", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)("orderItems")
], OrderItem);
