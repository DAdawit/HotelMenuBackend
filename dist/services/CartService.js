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
exports.CartService = void 0;
const Cart_1 = require("../entities/Cart");
const Wishlist_1 = require("../entities/Wishlist");
const DBHelpers_1 = require("../utils/DBHelpers");
class CartService {
    getcartItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Cart_1.Cart.find({
                    relations: {
                        user: true,
                        menu: true,
                    },
                });
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    AddTocart(userId, req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCart = yield Cart_1.Cart.findOne({
                    where: {
                        user: { id: userId },
                        menu: { id: req.body.productId },
                    },
                    relations: {
                        menu: true,
                        color: true,
                    },
                });
                if (existingCart) {
                    existingCart.menu = req.body.productId;
                    existingCart.user = userId;
                    existingCart.color = (_a = req.body.colorId) !== null && _a !== void 0 ? _a : null;
                    try {
                        yield existingCart.save();
                    }
                    catch (error) {
                        console.log("error on saving");
                    }
                    return existingCart;
                }
                const cart = new Cart_1.Cart();
                cart.menu = req.body.productId;
                cart.user = userId;
                cart.color = (_b = req.body.colorId) !== null && _b !== void 0 ? _b : null;
                yield cart.save();
                return cart;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    RemoveFromCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield Cart_1.Cart.delete({ id: parseInt(id) });
                if (cart.affected === 0) {
                    return null;
                }
                return cart;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    addQuantity(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) } });
                if (cart !== null) {
                    cart.quantity = cart.quantity + 1;
                    yield cart.save();
                }
                return cart;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    subtractQuantity(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield Cart_1.Cart.findOne({ where: { id: parseInt(id) } });
                if (cart && cart.quantity == 1) {
                    return cart;
                }
                if (cart !== null) {
                    cart.quantity = cart.quantity - 1;
                    yield cart.save();
                }
                return cart;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    userCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield Cart_1.Cart.find({
                    where: { user: { id: userId } },
                    relations: {
                        menu: true,
                        color: true,
                    },
                    order: {
                        id: "ASC",
                    },
                });
                return cart;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    CartToWishlist(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield Cart_1.Cart.delete({ id: parseInt(req.params.id) });
                if (cart.affected === 0) {
                    return null;
                }
                const wishlist = new Wishlist_1.Wishlist();
                wishlist.product = req.body.productId;
                wishlist.user = userId;
                yield wishlist.save();
                return wishlist;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    ClearCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, DBHelpers_1.clearCart)(userId);
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while in clearing cart items");
            }
        });
    }
}
exports.CartService = CartService;
