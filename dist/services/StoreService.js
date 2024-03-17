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
exports.StoreService = void 0;
const Menu_1 = require("../entities/Menu");
const SingleFileUploade_1 = require("../utils/SingleFileUploade");
const DeleteImages_1 = require("../utils/DeleteImages");
const Store_1 = require("../entities/Store");
const User_1 = require("../entities/User");
const Order_1 = require("../entities/Order");
const ReportedStore_1 = require("../entities/ReportedStore");
const ReportedProduct_1 = require("../entities/ReportedProduct");
const Phone_1 = require("../entities/Phone");
class StoreService {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stores = yield Store_1.Store.find({
                    relations: {
                        user: true,
                    },
                });
                return stores;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products");
            }
        });
    }
    store(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = new Store_1.Store();
                store.email = req.body.email;
                store.storeName = req.body.storeName;
                store.description = req.body.description;
                store.tinNumber = req.body.tinNumber;
                store.fullAddress = req.body.fullAddress;
                store.lat = req.body.lat;
                store.long = req.body.long;
                yield store.save();
                const user = yield User_1.User.findOne({ where: { id: req.body.userId } });
                if (user === null) {
                    return null;
                }
                user.hasStore = true;
                user.store = store === null || store === void 0 ? void 0 : store.id;
                yield (user === null || user === void 0 ? void 0 : user.save());
                return store;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while saving the category");
            }
        });
    }
    detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield Store_1.Store.findOne({
                    where: { id: parseInt(id) },
                    relations: { user: true },
                });
                return store;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on store detail");
            }
        });
    }
    MyStore(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const store = yield Store_1.Store.findOne({
                    where: {
                        user: {
                            id: userId,
                        },
                    },
                });
                return store;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on store detail");
            }
        });
    }
    update(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield Store_1.Store.findOne({
                where: {
                    id: parseInt(req.params.id),
                },
            });
            if (store !== null) {
                store.email = req.body.email;
                store.storeName = req.body.storeName;
                store.description = req.body.description;
                store.tinNumber = req.body.tinNumber;
                store.fullAddress = req.body.fullAddress;
                store.lat = req.body.lat;
                store.long = req.body.long;
            }
            yield (store === null || store === void 0 ? void 0 : store.save());
            return store;
        });
    }
    UpdateStorePic(id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const store = yield Store_1.Store.findOne({
                where: {
                    id: parseInt(id),
                },
            });
            let imagePath;
            try {
                imagePath = yield (0, SingleFileUploade_1.uploadFile)(req, "stores");
            }
            catch (error) {
                imagePath = null;
            }
            const imageTodelete = `public/${store === null || store === void 0 ? void 0 : store.storePic}`;
            if ((store === null || store === void 0 ? void 0 : store.storePic) !== null) {
                if (imagePath !== null) {
                    yield (0, DeleteImages_1.DeleteImage)(imageTodelete);
                }
            }
            if (store !== null) {
                store.storePic = imagePath !== null && imagePath !== void 0 ? imagePath : "";
            }
            yield (store === null || store === void 0 ? void 0 : store.save());
            return store;
        });
    }
    remove(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({
                    where: {
                        id: userId,
                    },
                });
                const product = yield Store_1.Store.delete({ id: parseInt(id) });
                if (user) {
                    user.hasStore = false;
                    yield user.save();
                }
                if (product.affected === 0) {
                    return null;
                }
                return product;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting product");
            }
        });
    }
    GetOrders(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order_1.Order.find({
                    where: { store: { id: parseInt(req.params.storeId) } },
                    relations: {
                        deliveryAddress: true,
                        ordersItems: {
                            product: true,
                            model: true,
                            color: true,
                        },
                    },
                });
                return orders;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products");
            }
        });
    }
    GetProducts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Menu_1.Product.find({
                    where: { store: { id: parseInt(req.params.storeId) } },
                });
                return product;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products");
            }
        });
    }
    GetHiddenProducts(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Menu_1.Product.find({
                    where: { store: { id: parseInt(req.params.storeId) }, hidden: true },
                });
                return product;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching products");
            }
        });
    }
    GetReportsOnMyStore(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.storeId);
                const reports = yield ReportedStore_1.ReportedStore.find({
                    where: { store: { id: parseInt(req.params.storeId) } },
                });
                return reports;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching Reports on my store");
            }
        });
    }
    GetReportedProductsOfMyStore(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.storeId);
                const reports = yield ReportedProduct_1.ReportedProduct.find({
                    where: { store: { id: parseInt(req.params.storeId) } },
                    relations: {
                        user: true,
                    },
                });
                return reports;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching Reports on my store");
            }
        });
    }
    HideProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Menu_1.Product.findOneBy({ id: parseInt(req.params.id) });
                if (!product) {
                    return null;
                }
                product.hidden = true;
                product.save();
                return product;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on hidding product");
            }
        });
    }
    UnHideProduct(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield Menu_1.Product.findOneBy({ id: parseInt(req.params.id) });
                if (!product) {
                    return null;
                }
                product.hidden = false;
                product.save();
                return product;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on unhidding product");
            }
        });
    }
    GetStorePhoneNumbers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const phones = yield Phone_1.Phone.find({
                    where: {
                        store: {
                            id: parseInt(req.params.storeId),
                        },
                    },
                });
                return phones;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on fetching store phone numbers");
            }
        });
    }
    AddPhoneNumber(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const phone = new Phone_1.Phone();
                phone.store = req.params.storeId;
                phone.phoneNumber = req.body.phoneNumber;
                yield phone.save();
                return phone;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on unhidding product");
            }
        });
    }
    UpdatePhoneNumber(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const phone = yield Phone_1.Phone.findOneBy({ id: parseInt(req.params.id) });
                if (!phone) {
                    return null;
                }
                phone.phoneNumber = req.body.phoneNumber;
                yield phone.save();
                return phone;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred on unhidding product");
            }
        });
    }
    DeletePhoneNumber(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const phone = yield Phone_1.Phone.delete({ id: parseInt(req.params.id) });
                if (phone.affected === 0) {
                    return null;
                }
                return phone;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting category");
            }
        });
    }
}
exports.StoreService = StoreService;
