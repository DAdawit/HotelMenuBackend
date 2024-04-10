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
exports.MenuService = void 0;
const SingleFileUploade_1 = require("../utils/SingleFileUploade");
const DeleteImages_1 = require("../utils/DeleteImages");
const Color_1 = require("../entities/Color");
const typeorm_1 = require("typeorm");
const pagination_1 = require("../utils/pagination");
const Menu_1 = require("../entities/Menu");
const AvaliableMealTime_1 = require("../entities/AvaliableMealTime");
const Category_1 = require("../entities/Category");
const SubCategory_1 = require("../entities/SubCategory");
class MenuService {
    get2(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Menu_1.Menu.find({
                    relations: {
                        category: true,
                        subCategory: true,
                        available_meal_times: true,
                    },
                });
                // console.log(data);
                const queryBuilder = Menu_1.Menu.createQueryBuilder("menu")
                    .leftJoinAndSelect("menu.category", "category")
                    .leftJoinAndSelect("menu.subCategory", "subCategory")
                    .innerJoinAndSelect("menu.available_meal_times", "available_meal_times")
                    .orderBy("menu.created_at", "DESC");
                // Execute the query or perform further operations...
                return (0, pagination_1.Paginate)(queryBuilder, req);
                // return data;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products");
            }
        });
    }
    get(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menues = yield Menu_1.Menu.find({
                    take: req.body.take || 25,
                    skip: req.body.skip || 0,
                    relations: {
                        available_meal_times: true,
                        category: true,
                        subCategory: true,
                    },
                    order: {
                        created_at: "DESC",
                    },
                });
                return menues;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products");
            }
        });
    }
    FeatchMenuesByCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const category = yield Category_1.Category.findOneBy({
                    id,
                });
                const queryBuilder = Menu_1.Menu.createQueryBuilder("menu")
                    .where("menu.categoryId = :id", { id })
                    .leftJoin("menu.category", "category");
                const data = yield (0, pagination_1.Paginate)(queryBuilder, req);
                const result = Object.assign({ category }, data);
                return result;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products by category");
            }
        });
    }
    FeatchMenuesBySubCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("hello");
                const id = parseInt(req.params.id);
                const category = yield SubCategory_1.SubCategory.findOneBy({
                    id,
                });
                console.log(category);
                const queryBuilder = Menu_1.Menu.createQueryBuilder("menu")
                    .where("menu.subCategoryId = :id", { id })
                    .leftJoin("menu.subCategory", "subCategory");
                const data = yield (0, pagination_1.Paginate)(queryBuilder, req);
                return data;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products by category");
            }
        });
    }
    FeatchMenuesByMealTime(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const queryBuilder = Menu_1.Menu.createQueryBuilder("menu")
                    .innerJoin("menu.available_meal_times", "available_meal_times")
                    .where("available_meal_times.id = :id", { id });
                const data = yield (0, pagination_1.Paginate)(queryBuilder, req);
                return data;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products by category");
            }
        });
    }
    FeatchMenuBySubCategory(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menues = yield Menu_1.Menu.find({
                    where: { subCategory: { id: parseInt(req.params.id) } },
                });
                return menues;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products by subCategory");
            }
        });
    }
    MenuesByMealTime() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealtimes = yield AvaliableMealTime_1.AvailableMealTime.find({});
                const dataPromises = mealtimes.map((item) => __awaiter(this, void 0, void 0, function* () {
                    let menu = yield Menu_1.Menu.find({
                        where: {
                            available_meal_times: {
                                id: item.id,
                            },
                        },
                        take: 6,
                    });
                    return Object.assign(Object.assign({}, item), { menues: menu }); // Assuming you want to return the item with menus attached
                }));
                const data = yield Promise.all(dataPromises); // Wait for all promises to resolve
                return data;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products by category");
            }
        });
    }
    MenuesBySubCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealtimes = yield SubCategory_1.SubCategory.find({});
                const dataPromises = mealtimes.map((item) => __awaiter(this, void 0, void 0, function* () {
                    let menu = yield Menu_1.Menu.find({
                        where: {
                            subCategory: {
                                id: item.id,
                            },
                        },
                        take: 25,
                    });
                    return Object.assign(Object.assign({}, item), { menues: menu }); // Assuming you want to return the item with menus attached
                }));
                const data = yield Promise.all(dataPromises); // Wait for all promises to resolve
                return data;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products by category");
            }
        });
    }
    MenuesByCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealtimes = yield Category_1.Category.find({});
                const dataPromises = mealtimes.map((item) => __awaiter(this, void 0, void 0, function* () {
                    let menu = yield Menu_1.Menu.find({
                        where: {
                            category: {
                                id: item.id,
                            },
                        },
                        take: 6,
                    });
                    return Object.assign(Object.assign({}, item), { menues: menu }); // Assuming you want to return the item with menus attached
                }));
                const data = yield Promise.all(dataPromises); // Wait for all promises to resolve
                return data;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products by category");
            }
        });
    }
    FetchSpecialFoodsMenus() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menues = yield (0, typeorm_1.getRepository)(Menu_1.Menu)
                    .createQueryBuilder("menu")
                    .leftJoinAndSelect("menu.category", "category")
                    .where("category.name ILike :name", { name: `%food%` })
                    .take(15)
                    .getMany();
                return menues;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching menus by category name");
            }
        });
    }
    FetchMainDishes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menues = yield Menu_1.Menu.find({ where: { mainDishes: true }, take: 5 });
                return menues;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching menus by category name");
            }
        });
    }
    FetchAllMainDishes(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = (0, typeorm_1.getRepository)(Menu_1.Menu)
                    .createQueryBuilder("menu")
                    .where("menu.mainDishes = :mainDishes", { mainDishes: true });
                const data = yield (0, pagination_1.Paginate)(queryBuilder, req);
                return data;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching menus by category name");
            }
        });
    }
    FetchAllSpecialFoodsMenus(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = (0, typeorm_1.getRepository)(Menu_1.Menu)
                    .createQueryBuilder("menu")
                    .where("menu.special = :special", { special: true });
                const data = yield (0, pagination_1.Paginate)(queryBuilder, req);
                return data;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching menus by category name");
            }
        });
    }
    RelatedProducts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = yield Menu_1.Menu.findOne({
                    where: { id: parseInt(req.params.id) },
                    relations: {
                        subCategory: true,
                    },
                });
                if (!menu) {
                    return null;
                }
                const relatedMenues = yield Menu_1.Menu.find({
                    where: {
                        subCategory: { id: menu.subCategory.id },
                        id: (0, typeorm_1.Not)((0, typeorm_1.Equal)(menu.id)), // Exclude the original product from the results
                    },
                });
                return relatedMenues;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products by subCategory");
            }
        });
    }
    add(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log(req.body.availableMealLTimesIds);
                const availableMealTimes = yield AvaliableMealTime_1.AvailableMealTime.findByIds(req.body.available_meal_times);
                console.log(req.body);
                const menu = new Menu_1.Menu();
                menu.name = req.body.name;
                menu.description = req.body.description;
                menu.price = req.body.price;
                menu.special = req.body.special;
                menu.ingridiants = req.body.ingredients;
                menu.avaliable_all_day = req.body.avaliable_all_day;
                menu.mainDishes = req.body.mainDishes;
                menu.category = parseInt(req.body.categoryId);
                menu.subCategory =
                    parseInt(req.body.subCategoryId) !== 0
                        ? parseInt(req.body.subCategoryId)
                        : null;
                menu.available_meal_times = availableMealTimes;
                // console.log(menu);
                try {
                    yield menu.save();
                }
                catch (error) {
                    console.log(error);
                }
                menu.loadImagePath();
                // console.log(menu);
                return menu;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while saving the category");
            }
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = yield Menu_1.Menu.findOneBy({ id: parseInt(req.params.id) });
            const availableMealTimes = yield AvaliableMealTime_1.AvailableMealTime.findByIds(req.body.available_meal_times);
            if (!menu) {
                return null;
            }
            // console.log(req.body);
            menu.name = req === null || req === void 0 ? void 0 : req.body.name;
            menu.description = req.body.description;
            menu.price = req.body.price;
            menu.special = req.body.special;
            menu.ingridiants = req.body.ingredients;
            menu.avaliable_all_day = req.body.avaliable_all_day;
            menu.mainDishes = req.body.mainDishes;
            menu.category = parseInt(req.body.categoryId);
            menu.subCategory =
                parseInt(req.body.subCategoryId) !== 0
                    ? parseInt(req.body.subCategoryId)
                    : null;
            menu.available_meal_times = availableMealTimes;
            console.log(menu);
            try {
                yield menu.save();
            }
            catch (error) {
                console.log(error);
            }
            menu.loadImagePath();
            console.log(menu);
            return menu;
        });
    }
    detail(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = yield Menu_1.Menu.findOne({
                    where: { id: parseInt(req.params.id) },
                    relations: {
                        available_meal_times: true,
                        category: true,
                        subCategory: true,
                    },
                });
                return menu;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on product detail");
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = yield Menu_1.Menu.delete({ id: parseInt(id) });
                if (menu.affected === 0) {
                    return null;
                }
                return menu;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting product");
            }
        });
    }
    AddProductColor(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body, req.params);
            try {
                const color = new Color_1.Color();
                color.quantity = req.body.quantity;
                color.name = req.body.name;
                yield color.save();
                return color;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while saving product model.");
            }
        });
    }
    AddOrChangeMenuImage(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const menu = yield Menu_1.Menu.findOneBy({ id: parseInt(req.params.id) });
            let imagePath;
            try {
                imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "menues");
            }
            catch (error) {
                imagePath = null;
            }
            const imageTodelete = `public/${menu === null || menu === void 0 ? void 0 : menu.image}`;
            if ((menu === null || menu === void 0 ? void 0 : menu.image) !== null) {
                if (imagePath !== null) {
                    yield (0, DeleteImages_1.DeleteImage)(imageTodelete);
                }
            }
            if (menu !== null) {
                menu.image = imagePath ? imagePath : "";
            }
            yield (menu === null || menu === void 0 ? void 0 : menu.save());
            menu === null || menu === void 0 ? void 0 : menu.loadImagePath();
            return menu;
        });
    }
}
exports.MenuService = MenuService;
