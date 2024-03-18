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
exports.DeliveryAddress = void 0;
const Order_1 = require("./Order");
const User_1 = require("./User");
const typeorm_1 = require("typeorm");
let DeliveryAddress = class DeliveryAddress extends typeorm_1.BaseEntity {
};
exports.DeliveryAddress = DeliveryAddress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DeliveryAddress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DeliveryAddress.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "double precision", nullable: true }),
    __metadata("design:type", Object)
], DeliveryAddress.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "double precision", nullable: true }),
    __metadata("design:type", Object)
], DeliveryAddress.prototype, "long", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Order_1.Order, (order) => order.deliveryAddress, {
        nullable: true,
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], DeliveryAddress.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.deliveryAddress, {
        onDelete: "SET NULL",
    }),
    __metadata("design:type", User_1.User)
], DeliveryAddress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], DeliveryAddress.prototype, "default", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], DeliveryAddress.prototype, "useCurrentLocation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DeliveryAddress.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], DeliveryAddress.prototype, "updated_at", void 0);
exports.DeliveryAddress = DeliveryAddress = __decorate([
    (0, typeorm_1.Entity)("deliveryAddress")
], DeliveryAddress);
