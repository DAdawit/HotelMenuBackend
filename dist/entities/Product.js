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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const Cart_1 = require("./Cart");
const OrderItems_1 = require("./OrderItems");
const Image_1 = require("./Image");
const Store_1 = require("./Store");
const Review_1 = require("./Review");
const ReportedProduct_1 = require("./ReportedProduct");
const Model_1 = require("./Model");
const SubCategory_1 = require("./SubCategory");
const Category_1 = require("./Category");
const Color_1 = require("./Color");
const host_1 = require("../utils/host");
let Product = class Product extends typeorm_1.BaseEntity {
    loadImagePath() {
        const baseUrl = (0, host_1.getBaseUrl)();
        this._coverImageUrl = baseUrl + this.coverImage; // Construct the full image path after entity load
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "totalQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", String)
], Product.prototype, "modelName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "featured", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "hidden", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Product.prototype, "loadImagePath", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.product) // specify inverse side as a second parameter
    ,
    __metadata("design:type", Category_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SubCategory_1.SubCategory, (subcategory) => subcategory.product),
    __metadata("design:type", SubCategory_1.SubCategory)
], Product.prototype, "subCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Image_1.Image, (images) => images.product),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cart_1.Cart, (cart) => cart.product),
    __metadata("design:type", Array)
], Product.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Model_1.Model, (model) => model.product),
    __metadata("design:type", Array)
], Product.prototype, "models", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1.Review, (review) => review.product),
    __metadata("design:type", Array)
], Product.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReportedProduct_1.ReportedProduct, (review) => review.product),
    __metadata("design:type", Array)
], Product.prototype, "reportProduct", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderItems_1.OrderItem, (orderItem) => orderItem.product),
    __metadata("design:type", Array)
], Product.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Store_1.Store, (store) => store.products, { onDelete: "CASCADE" }),
    __metadata("design:type", Store_1.Store)
], Product.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Cart_1.Cart, (cart) => cart.model),
    __metadata("design:type", Model_1.Model)
], Product.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Cart_1.Cart, (cart) => cart.color),
    __metadata("design:type", Color_1.Color)
], Product.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)("products")
], Product);
