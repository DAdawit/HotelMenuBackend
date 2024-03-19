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
const Review_1 = require("../entities/Review");
const Color_1 = require("../entities/Color");
const typeorm_1 = require("typeorm");
const Menu_1 = require("../entities/Menu");
const AvaliableMealTime_1 = require("../entities/AvaliableMealTime");
class MenuService {
    // async GetPaginatedProducts(req: Request): Promise<PaginationResult<Product>> {
    //   const skip = (req.body.skip - 1) * req.body.take;
    //   // Fetching products along with their relationships
    //   const [products, total] = await Product.findAndCount({
    //     take: pageSize,
    //     skip: skip,
    //   });
    //   const totalPages = Math.ceil(total / pageSize);
    //   return {
    //     data: products,
    //     total: total,
    //     totalPages: totalPages,
    //     currentPage: page,
    //     pageSize: pageSize,
    //   };
    // }
    get(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menues = yield Menu_1.Menu.find({
                    take: req.body.take || 15,
                    skip: req.body.skip || 0,
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
                const menues = yield Menu_1.Menu.find({
                    where: { category: { id: parseInt(req.params.id) } },
                });
                return menues;
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
                console.log(req.body.availableMealLTimesIds);
                const availableMealTimes = yield AvaliableMealTime_1.AvailableMealTime.findByIds(req.body.available_meal_times);
                // console.log(availableMealTimes);
                const menu = new Menu_1.Menu();
                menu.name = req.body.name;
                menu.description = req.body.description;
                menu.price = req.body.price;
                menu.special = req.body.special;
                menu.ingridiants = req.body.ingridiants;
                menu.avaliable_all_day = req.body.avaliable_all_day;
                menu.category = parseInt(req.body.categoryId);
                menu.subCategory = parseInt(req.body.subCategoryId);
                menu.available_meal_times = availableMealTimes;
                console.log(menu);
                try {
                    yield menu.save();
                }
                catch (error) {
                    console.log(error);
                }
                return menu;
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
            const menu = yield Menu_1.Menu.findOne({
                where: {
                    id: parseInt(id),
                },
            });
            let imagePath;
            try {
                imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "menues");
            }
            catch (error) {
                imagePath = null;
            }
            const imageTodelete = `public/${menu === null || menu === void 0 ? void 0 : menu.image}`;
            if (imagePath !== null) {
                yield (0, DeleteImages_1.DeleteImage)(imageTodelete);
            }
            if (menu !== null) {
                menu.name = req.body.name;
                menu.description = req.body.description;
                menu.price = req.body.price;
                menu.image = imagePath !== null && imagePath !== void 0 ? imagePath : imageTodelete;
            }
            yield (menu === null || menu === void 0 ? void 0 : menu.save());
            return menu;
        });
    }
    detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Productreview = yield Review_1.Review.createQueryBuilder("review")
                    .leftJoinAndSelect("review.user", "user", "user.id = review.userId")
                    .select([
                    "review.id",
                    "review.rate",
                    "user.firstName",
                    "user.profilePic",
                ])
                    .where("review.productId = :id", { id: parseInt(id) })
                    .getMany();
                let average = 0;
                const total = Productreview.length;
                const sum = Productreview.reduce((acc, review) => {
                    return acc + review.rate;
                }, 0);
                average = sum / total;
                const menu = yield Menu_1.Menu.findOne({
                    where: { id: parseInt(id) },
                });
                if (!menu) {
                    return null;
                }
                let data = {
                    menu: menu,
                    review: {
                        average: average || 0,
                        total: total,
                        details: Productreview,
                    },
                };
                return data;
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
