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
const SubCategoryService_1 = require("../services/SubCategoryService");
const service = new SubCategoryService_1.SubCategoryService();
class SubcategoryController {
}
_a = SubcategoryController;
SubcategoryController.getAll = (req, res) => {
    service
        .index()
        .then((subcategories) => {
        res.send(subcategories);
    })
        .catch((err) => {
        res.send(err);
    });
};
SubcategoryController.getDetail = (req, res) => {
    service
        .detail(req.params.id)
        .then((subcategory) => {
        res.send(subcategory);
    })
        .catch((err) => {
        res.send(err);
    });
};
SubcategoryController.addSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const subCategory = plainToInstance(SubCategory, req.body);
    // const errors = await validate(subCategory);
    // const err = validationErrorFormater(errors);
    // if (errors.length > 0) {
    //   res.status(400).send(err);
    // }
    service
        .store(req)
        .then((subCategory) => {
        res.send(subCategory);
    })
        .catch((err) => {
        res.send(err);
    });
});
SubcategoryController.updateSubCategory = (req, res) => {
    service
        .update(req)
        .then((category) => {
        res.send(category);
    })
        .catch((err) => {
        res.send(err);
    });
};
SubcategoryController.deleteSubcategory = (req, res) => {
    service
        .remove(req.params.id)
        .then(() => {
        res.send({ message: "SubCategory deleted successfully" });
    })
        .catch((err) => {
        res.send(err);
    });
};
exports.default = SubcategoryController;
