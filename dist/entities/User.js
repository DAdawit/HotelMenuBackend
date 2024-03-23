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
exports.User = void 0;
const class_validator_1 = require("class-validator");
const Cart_1 = require("./Cart");
const Order_1 = require("./Order");
const typeorm_1 = require("typeorm");
const Wishlist_1 = require("./Wishlist");
const Review_1 = require("./Review");
const ReportedMenu_1 = require("./ReportedMenu");
const Types_1 = require("../Types");
const DeliveryAddress_1 = require("./DeliveryAddress");
const host_1 = require("../utils/host");
let User = class User extends typeorm_1.BaseEntity {
    loadImagePath() {
        const baseUrl = (0, host_1.getBaseUrl)();
        this._profilePicUrl = baseUrl + this.profilePic;
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "profilePic", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "loadImagePath", null);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Types_1.Roles, default: Types_1.Roles.admin }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1.Review, (review) => review.user, { onDelete: "SET NULL" }),
    __metadata("design:type", Array)
], User.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.Order, (order) => order.user, { onDelete: "RESTRICT" }),
    __metadata("design:type", Array)
], User.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cart_1.Cart, (cart) => cart.user),
    __metadata("design:type", Array)
], User.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Wishlist_1.Wishlist, (wishlist) => wishlist.user),
    __metadata("design:type", Array)
], User.prototype, "wishlist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReportedMenu_1.ReportedMenu, (menu) => menu.user),
    __metadata("design:type", Array)
], User.prototype, "reportProduct", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DeliveryAddress_1.DeliveryAddress, (deliverAddress) => deliverAddress.user, {
        onDelete: "SET NULL",
    }),
    __metadata("design:type", DeliveryAddress_1.DeliveryAddress)
], User.prototype, "deliveryAddress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
