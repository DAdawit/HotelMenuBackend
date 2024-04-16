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
exports.ReportService = void 0;
const Category_1 = require("../entities/Category");
const config_1 = require("../config");
const SubCategory_1 = require("../entities/SubCategory");
const AvaliableMealTime_1 = require("../entities/AvaliableMealTime");
const Menu_1 = require("../entities/Menu");
class ReportService {
    IenusByCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryWithMenuItemsCount = yield config_1.AppDataSource.manager
                .getRepository(Category_1.Category)
                .createQueryBuilder("category")
                .leftJoin("category.menu", "menu")
                .select("category.id", "id")
                .addSelect("category.name", "name")
                .addSelect("COUNT(menu.id)", "menuItemsCount")
                .groupBy("category.id") // Keep this for SQL validity
                .getRawMany();
            return categoryWithMenuItemsCount;
        });
    }
    IenusBySubCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryWithMenuItemsCount = yield config_1.AppDataSource.manager
                .getRepository(SubCategory_1.SubCategory)
                .createQueryBuilder("category")
                .leftJoin("category.menu", "menu")
                .select("category.id", "id")
                .addSelect("category.name", "name")
                .addSelect("COUNT(menu.id)", "menuItemsCount")
                .groupBy("category.id") // Keep this for SQL validity
                .getRawMany();
            return categoryWithMenuItemsCount;
        });
    }
    MenusBymealtime() {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryWithMenuItemsCount = yield config_1.AppDataSource.manager
                .getRepository(AvaliableMealTime_1.AvailableMealTime)
                .createQueryBuilder("mealtime")
                .leftJoin("mealtime.menues", "menues")
                .select("mealtime.id", "id")
                .addSelect("mealtime.name", "name")
                .addSelect("COUNT(mealtime.id)", "menuItemsCount")
                .groupBy("mealtime.id") // Keep this for SQL validity
                .getRawMany();
            return categoryWithMenuItemsCount;
        });
    }
    Index() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield Category_1.Category.count();
            const subcategories = yield Category_1.Category.count();
            const menus = yield Menu_1.Menu.count();
            const data = {
                categories: categories,
                subcategories: subcategories,
                menus: menus,
            };
            return data;
        });
    }
}
exports.ReportService = ReportService;
