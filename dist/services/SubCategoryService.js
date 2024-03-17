"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryService = void 0;
const SubCategory_1 = require("../entities/SubCategory");
class SubCategoryService {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategories = yield SubCategory_1.SubCategory.find({
                    relations: { category: true },
                });
                return subCategories;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching subCategories");
            }
        });
    }
    store(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategory = new SubCategory_1.SubCategory();
                subCategory.name = data.name;
                subCategory.category = data.categoryId;
                yield subCategory.save();
                return subCategory;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching subCategories");
            }
        });
    }
    detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategory = yield SubCategory_1.SubCategory.findOne({
                    where: {
                        id: parseInt(id),
                    },
                });
                return subCategory;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching subCategories");
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategory = yield SubCategory_1.SubCategory.findOne({
                    where: { id: parseInt(id) },
                });
                if (!subCategory) {
                    return null;
                }
                subCategory.name = data.name;
                subCategory.category = data.categoryId;
                yield subCategory.save();
                return subCategory;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting category");
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategory = yield SubCategory_1.SubCategory.delete({ id: parseInt(id) });
                if (subCategory.affected === 0) {
                    return null;
                }
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting category");
            }
        });
    }
}
exports.SubCategoryService = SubCategoryService;
