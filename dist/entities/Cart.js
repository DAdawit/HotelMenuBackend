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
exports.Cart = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Menu_1 = require("./Menu");
const Color_1 = require("./Color");
let Cart = class Cart extends typeorm_1.BaseEntity {
};
exports.Cart = Cart;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 1,
    }),
    __metadata("design:type", Number)
], Cart.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.cart, { onDelete: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Menu_1.Menu, (Menu) => Menu.cart, { onDelete: "CASCADE" }),
    __metadata("design:type", Menu_1.Menu)
], Cart.prototype, "menu", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Color_1.Color, (color) => color.cart, {
        onDelete: "CASCADE",
        nullable: true,
    }),
    __metadata("design:type", Color_1.Color)
], Cart.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cart.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Cart.prototype, "updated_at", void 0);
exports.Cart = Cart = __decorate([
    (0, typeorm_1.Entity)("carts")
], Cart);
