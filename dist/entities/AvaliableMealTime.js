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
exports.AvailableMealTime = void 0;
const typeorm_1 = require("typeorm");
const Menu_1 = require("./Menu");
const Types_1 = require("../Types");
let AvailableMealTime = class AvailableMealTime extends typeorm_1.BaseEntity {
};
exports.AvailableMealTime = AvailableMealTime;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AvailableMealTime.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        enum: Types_1.MealTime,
        unique: true, // Ensures each meal time is only listed once
    }),
    __metadata("design:type", String)
], AvailableMealTime.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Menu_1.Menu, (menu) => menu.available_meal_times),
    __metadata("design:type", Array)
], AvailableMealTime.prototype, "menues", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AvailableMealTime.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AvailableMealTime.prototype, "updated_at", void 0);
exports.AvailableMealTime = AvailableMealTime = __decorate([
    (0, typeorm_1.Entity)("availableMealTime")
], AvailableMealTime);
