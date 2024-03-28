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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryService_1 = require("../services/CategoryService");
const Category_1 = require("../entities/Category");
const DeleteImages_1 = require("../utils/DeleteImages");
const service = new CategoryService_1.CategoryService();
class CategoryController {
    static getCategoryById(req, res) {
        service
            .getById(req.params.id)
            .then((category) => {
            res.send(category);
        })
            .catch((err) => {
            res.send(err);
        });
    }
}
_a = CategoryController;
CategoryController.getCategories = (req, res) => {
    service
        .getAll()
        .then((categories) => {
        res.json(categories);
    })
        .catch((err) => [res.send(err)]);
};
CategoryController.getCategorieswithSubcategories = (req, res) => {
    service
        .categoriesWithSubCategories()
        .then((categories) => {
        res.json(categories);
    })
        .catch((err) => [res.send(err)]);
};
CategoryController.addCategory = (req, res) => {
    service
        .add(req)
        .then((category) => {
        res.send(category);
    })
        .catch((err) => {
        res.send(err);
    });
};
CategoryController.updateCategory = (req, res) => {
    service
        .update(req.params.id, req)
        .then((category) => {
        res.send(category);
    })
        .catch((err) => {
        res.send(err);
    });
};
CategoryController.removeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_1.Category.findOne({
        where: {
            id: parseInt(req.params.id),
        },
    });
    if (!category) {
        res.status(404).send({ message: "Category not found" });
    }
    else {
        service
            .remove(req.params.id)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            const imagePath = `public/${category.image}`;
            yield (0, DeleteImages_1.DeleteImage)(imagePath);
            res.send({ message: "Category deleted successfully" });
        }))
            .catch((err) => {
            res.send(err);
        });
    }
});
exports.default = CategoryController;
