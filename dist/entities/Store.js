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
exports.Store = void 0;
const class_validator_1 = require("class-validator");
const Order_1 = require("./Order");
const typeorm_1 = require("typeorm");
const Menu_1 = require("./Menu");
const User_1 = require("./User");
const ReportedStore_1 = require("./ReportedStore");
const ReportedProduct_1 = require("./ReportedProduct");
const Phone_1 = require("./Phone");
const host_1 = require("../utils/host");
let Store = class Store extends typeorm_1.BaseEntity {
    loadImagePath() {
        const baseUrl = (0, host_1.getBaseUrl)();
        this._storePicUrl = this.storePic ? baseUrl + this.storePic : null;
    }
};
exports.Store = Store;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Store.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], Store.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], Store.prototype, "storeName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], Store.prototype, "fullAddress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], Store.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "storePic", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Store.prototype, "loadImagePath", null);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], Store.prototype, "tinNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "long", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Store.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.store),
    __metadata("design:type", User_1.User)
], Store.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Menu_1.Product, (product) => product.store, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Store.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Phone_1.Phone, (phone) => phone.store, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Store.prototype, "phones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReportedProduct_1.ReportedProduct, (reportedProduct) => reportedProduct.store, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Store.prototype, "reportProduct", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReportedStore_1.ReportedStore, (report) => report.store, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Store.prototype, "reportStore", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.Order, (order) => order.store, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Store.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Store.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Store.prototype, "updated_at", void 0);
exports.Store = Store = __decorate([
    (0, typeorm_1.Entity)("stores")
], Store);
