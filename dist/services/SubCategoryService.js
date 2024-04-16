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
const SingleFileUploade_1 = require("../utils/SingleFileUploade");
const DeleteImages_1 = require("../utils/DeleteImages");
const pagination_1 = require("../utils/pagination");
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
    AdmingetSubCategories(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = SubCategory_1.SubCategory.createQueryBuilder("subcategory")
                    .leftJoinAndSelect("subcategory.category", "category")
                    .orderBy("subcategory.created_at", "DESC");
                const data = (0, pagination_1.Paginate)(queryBuilder, req);
                return data;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching subCategories");
            }
        });
    }
    store(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "subCategory");
                const subCategory = new SubCategory_1.SubCategory();
                subCategory.name = req.body.name;
                subCategory.category = req.body.categoryId;
                subCategory.image = imagePath || "";
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
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("update");
            const subcategory = yield SubCategory_1.SubCategory.findOneBy({
                id: parseInt(req.params.id),
            });
            let imagePath;
            try {
                imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "subCategory");
            }
            catch (error) {
                imagePath = null;
            }
            const imageTodelete = `public/${subcategory === null || subcategory === void 0 ? void 0 : subcategory.image}`;
            if (imagePath !== null) {
                yield (0, DeleteImages_1.DeleteImage)(imageTodelete);
            }
            if (subcategory !== null) {
                subcategory.name = req.body.name;
                subcategory.category = req.body.categoryId;
                subcategory.image = imagePath !== null && imagePath !== void 0 ? imagePath : subcategory.image;
            }
            yield (subcategory === null || subcategory === void 0 ? void 0 : subcategory.save());
            return subcategory;
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
