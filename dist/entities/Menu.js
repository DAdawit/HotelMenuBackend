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
exports.Menu = void 0;
const typeorm_1 = require("typeorm");
const Cart_1 = require("./Cart");
const OrderItems_1 = require("./OrderItems");
const Review_1 = require("./Review");
const ReportedMenu_1 = require("./ReportedMenu");
const SubCategory_1 = require("./SubCategory");
const Category_1 = require("./Category");
const host_1 = require("../utils/host");
const Types_1 = require("../Types");
let Menu = class Menu extends typeorm_1.BaseEntity {
    loadImagePath() {
        const baseUrl = (0, host_1.getBaseUrl)();
        this._coverImageUrl = baseUrl + this.coverImage; // Construct the full image path after entity load
    }
};
exports.Menu = Menu;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Menu.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Menu.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Menu.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Menu.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Menu.prototype, "special", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Menu.prototype, "ingridiants", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "avaliable_all_day", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        enum: Types_1.MealTime,
        array: true,
        default: [],
    }),
    __metadata("design:type", Array)
], Menu.prototype, "avaliable_meal_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Menu.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Menu.prototype, "loadImagePath", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.menu) // specify inverse side as a second parameter
    ,
    __metadata("design:type", Category_1.Category)
], Menu.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SubCategory_1.SubCategory, (subcategory) => subcategory.product),
    __metadata("design:type", SubCategory_1.SubCategory)
], Menu.prototype, "subCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cart_1.Cart, (cart) => cart.menu),
    __metadata("design:type", Array)
], Menu.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1.Review, (review) => review.menu),
    __metadata("design:type", Array)
], Menu.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReportedMenu_1.ReportedMenu, (review) => review.menu),
    __metadata("design:type", Array)
], Menu.prototype, "reportMenu", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderItems_1.OrderItem, (orderItem) => orderItem.menu),
    __metadata("design:type", Array)
], Menu.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Menu.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Menu.prototype, "updated_at", void 0);
exports.Menu = Menu = __decorate([
    (0, typeorm_1.Entity)("menues")
], Menu);
