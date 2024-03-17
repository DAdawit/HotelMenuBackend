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
exports.WishLilstService = void 0;
const Cart_1 = require("../entities/Cart");
const Wishlist_1 = require("../entities/Wishlist");
const CartService_1 = require("./CartService");
const DBHelpers_1 = require("../utils/DBHelpers");
const cartService = new CartService_1.CartService();
class WishLilstService {
    GetWishlists() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Wishlist_1.Wishlist.find({
                    relations: {
                        user: true,
                        product: true,
                    },
                });
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while retrieving wishlist");
            }
        });
    }
    AddToWishList(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCart = yield Wishlist_1.Wishlist.find({
                    where: {
                        user: { id: userId },
                        product: { id: data.productId },
                    },
                });
                if (existingCart.length > 0) {
                    return null;
                }
                const wishlist = new Wishlist_1.Wishlist();
                wishlist.product = data.productId;
                wishlist.user = userId;
                yield wishlist.save();
                return wishlist;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while saving the wishlist");
            }
        });
    }
    RemoveFromWishlist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wishlist = yield Wishlist_1.Wishlist.delete({ id: parseInt(id) });
                if (wishlist.affected === 0) {
                    return null;
                }
                return wishlist;
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while deleting the wishlist");
            }
        });
    }
    userWishlist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wishlist = yield Wishlist_1.Wishlist.find({
                    where: { user: { id: id } },
                    relations: {
                        product: true,
                    },
                    order: {
                        id: "ASC",
                    },
                });
                return wishlist;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    WishListToCart(userId, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wishlist = yield Wishlist_1.Wishlist.delete({ id: parseInt(req.params.id) });
                if (wishlist.affected === 0) {
                    return null;
                }
                const cart = new Cart_1.Cart();
                cart.menu = req.body.productId;
                cart.user = userId;
                yield cart.save();
                return cart;
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
            }
        });
    }
    ClearWishlist(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, DBHelpers_1.clearWishlist)(userId);
            }
            catch (error) {
                throw new Error(error instanceof Error
                    ? error.message
                    : "An unknown error occurred while in clearing cart items");
            }
        });
    }
}
exports.WishLilstService = WishLilstService;
