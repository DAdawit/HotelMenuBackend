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
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Profile = class Profile extends typeorm_1.BaseEntity {
};
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Name is required!" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Address is required!" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "City is required!" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Open time is required!" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "openTime", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "email is required!" }),
    (0, class_validator_1.IsEmail)({}, { message: "is not a valid email address" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "PhoneNumber is required!" }),
    (0, class_validator_1.MinLength)(10),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Profile.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "secondaryPhone", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "updated_at", void 0);
exports.Profile = Profile = __decorate([
    (0, typeorm_1.Entity)("profiles")
], Profile);
