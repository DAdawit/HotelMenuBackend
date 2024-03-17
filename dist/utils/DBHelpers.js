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
exports.clearWishlist = exports.clearCart = void 0;
const Cart_1 = require("../entities/Cart");
const Wishlist_1 = require("../entities/Wishlist");
const clearCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield Cart_1.Cart.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
        cartItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield Cart_1.Cart.delete({ id: item.id });
        }));
    }
    catch (error) { }
});
exports.clearCart = clearCart;
const clearWishlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wishlists = yield Wishlist_1.Wishlist.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
        wishlists.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            yield Wishlist_1.Wishlist.delete({ id: item.id });
        }));
    }
    catch (error) { }
});
exports.clearWishlist = clearWishlist;
