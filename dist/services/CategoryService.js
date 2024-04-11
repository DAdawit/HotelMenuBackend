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
exports.CategoryService = void 0;
const Category_1 = require("../entities/Category");
const SingleFileUploade_1 = require("../utils/SingleFileUploade");
const DeleteImages_1 = require("../utils/DeleteImages");
const pagination_1 = require("../utils/pagination");
class CategoryService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield Category_1.Category.find({});
                return categories;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching category");
            }
        });
    }
    admingetCategories(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = Category_1.Category.createQueryBuilder().orderBy("created_at", "DESC");
                const data = (0, pagination_1.Paginate)(queryBuilder, req);
                return data;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching category");
            }
        });
    }
    categoriesWithSubCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield Category_1.Category.find({
                    relations: {
                        subCategory: true,
                    },
                });
                return categories;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching category");
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = Category_1.Category.findOne({
                    where: { id: parseInt(id) },
                    relations: {
                        subCategory: true,
                    },
                });
                return category;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching category");
            }
        });
    }
    categoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = Category_1.Category.findOneBy({
                    id: parseInt(id),
                });
                return category;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred in fetching category");
            }
        });
    }
    add(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Use the utility function to handle file upload
                const imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "category");
                const category = new Category_1.Category();
                category.name = req.body.name.toLowerCase();
                category.image = imagePath || "";
                try {
                    yield category.save();
                }
                catch (error) {
                    console.log(error);
                }
                return category;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while saving the category");
            }
        });
    }
    update(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield Category_1.Category.findOne({
                where: {
                    id: parseInt(id),
                },
            });
            let imagePath;
            try {
                imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "category");
            }
            catch (error) {
                imagePath = null;
            }
            const imageTodelete = `public/${category === null || category === void 0 ? void 0 : category.image}`;
            if (imagePath !== null) {
                yield (0, DeleteImages_1.DeleteImage)(imageTodelete);
            }
            if (category !== null) {
                category.name = req.body.name.toLowerCase();
                category.image = imagePath !== null && imagePath !== void 0 ? imagePath : category.image;
            }
            yield (category === null || category === void 0 ? void 0 : category.save());
            return category;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield Category_1.Category.delete({ id: parseInt(id) });
                if (category.affected === 0) {
                    return null;
                }
                return category;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting category");
            }
        });
    }
}
exports.CategoryService = CategoryService;
